import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import {
  PIECES_CATEGORY,
  PieceType,
} from 'src/common/constants/pieces-category';
import {
  createNewProductType,
  Product,
  ProductType,
} from 'src/common/entities/product.entity';
import { exceptionMessages } from 'src/common/exceptions/exceptions-messages';
import {
  CreateAditionalByItemDto,
  CreateItemByOrderDto,
  CreateProductByItemDto,
} from '../dto/create-item-by-order.dto';
import { CreateOrderDto } from '../dto/create-order.dto';
import { UpdateOrderDto } from '../dto/update-order.dto';
import { AditionalRepository } from './../../aditional/repositories/aditional.repository';
import {
  Aditional,
  createNewAditionalType,
} from './../../common/entities/aditional.entity';
import { Item } from 'src/common/entities/item.entity';
import { AditionalType } from 'src/common/entities/aditional.entity';
import { ProductService } from 'src/product/services/product.service';
import { Address } from 'src/common/entities/address.entity';
import {
  DELIVERY_FEE,
  PaymentRateType,
  PAYMENT_RATE,
} from 'src/common/constants/tax';
import { CreateFormOfPaymentByOrderDto } from '../dto/create-form-of-payment-by-order.dto';
import { Order } from 'src/common/entities/order.entity';
import { DeliveryStatus } from 'src/common/constants/delivery-status';
import { CountOrderService } from './count-order.service';
import { OrderRepository } from '../repositories/order.repository';
import { OrderQueryParamsDto } from '../dto/order-query-params.dto';
interface ICalculateTotalArgs {
  itemsTotal: number;
  deliveryFeeTotal: number;
  formOfPayment: CreateFormOfPaymentByOrderDto[];
}
@Injectable()
export class OrderService {
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly aditionalRepository: AditionalRepository,
    private readonly productService: ProductService,
    private readonly countOrderService: CountOrderService
  ) {}
  // TODO:
  // [x] 1- calcular preço dos produtos e adicionais
  // [ ] 2- calcular frete
  // [x] 3- calcular forma de pagameto
  // [x] 4- calcular troco
  // [ ] enviar direto para fila de preparo com
  async create(createOrderDto: CreateOrderDto) {
    // console.log(createOrderDto);
    if (!createOrderDto.items || createOrderDto.items.length === 0) {
      throw new BadRequestException({ message: 'Order not contains Items' });
    }
    const itemsResponse = await this.createAllItemsOfOrder(
      createOrderDto.items
    );
    const deliveryFee = await this.calculateDelivery(
      createOrderDto.isDelivery,
      createOrderDto.address
    );
    const payment = await this.calculateOrderTotal({
      itemsTotal: itemsResponse.total,
      deliveryFeeTotal: deliveryFee,
      formOfPayment: createOrderDto.formOfPayment,
    });
    const startDate = new Date().toISOString();

    const orderId = await this.countOrderService.getNextOrderId();

    const order: Order = {
      orderId: orderId,
      clientId: createOrderDto.clientId,
      items: itemsResponse.items,
      address: createOrderDto.address,
      isDelivery: createOrderDto.isDelivery,
      deliveryFee: deliveryFee,
      total: payment.total,
      startDate: startDate,
      updateDate: startDate,
      status: payment.status,
      formOfPayment: payment.formOfPayment,
    };

    await this.orderRepository.create(order);
    return order;
    return '[SUCCESS] This action adds a new order';
  }

  async calculateOrderTotal(data: ICalculateTotalArgs) {
    if (data.formOfPayment.length !== 1) {
      throw new BadRequestException({
        message:
          'Não tem Formas de pagamento disponível. Insira a forma de Pagamento',
      });
    }
    const formOfPayment = data.formOfPayment[0];
    // if (data.formOfPayment[0].name !== data.formOfPaymentName) {
    //   throw new BadRequestException({
    //     message: 'Formas de pagamento não coincidem',
    //   });
    // }
    let value: number = data.itemsTotal + data.deliveryFeeTotal;
    let total: number = +(
      value +
      (value * PAYMENT_RATE[formOfPayment.name]) / 100
    ).toFixed(2);

    if (
      formOfPayment.needChange &&
      formOfPayment.name === PaymentRateType.DINHEIRO
    ) {
      formOfPayment.totalChanged = +(
        formOfPayment.totalReceived - total
      ).toFixed(2);
    }
    return {
      total,
      formOfPayment: data.formOfPayment,
      status:
        formOfPayment.name === PaymentRateType.PIX
          ? DeliveryStatus.PAYMENT_VALIDATION
          : DeliveryStatus.TO_PRINT,
    };
  }

  async calculateDelivery(isDelivery: boolean, address?: Address) {
    if (!isDelivery) return DELIVERY_FEE.RETIRADA;
    return DELIVERY_FEE.ARACATI;
  }
  async calculatePaymentChange() {
    return [];
  }

  async createAllItemsOfOrder(
    items?: CreateItemByOrderDto[]
  ): Promise<{ total: number; items: Item[] }> {
    const itemsData: Item[] = [];
    let total: number = 0;
    for await (let item of items!) {
      const response = await this.calculateItem(item);
      itemsData.push(response);
      total += response.subTotal;
    }
    return {
      total,
      items: itemsData,
    };
  }

  async calculateItem(itemProduct: CreateItemByOrderDto): Promise<Item> {
    try {
      // Busca e soma os valores dos adicionais desse item do pedido
      const aditionalsResponse = await this.findAditionalByIdsAndCalculate(
        itemProduct?.aditionals
      );

      // pega so os ids dos produtos para consultar no banco os detalhes
      const productsId: string[] = [];
      itemProduct.products!.forEach((product) => {
        productsId.push(product.id);
      });

      const productsResponse = await this.productService.findProductsById(
        productsId
      );

      // verifica se o tipo do item corresponde a quantidade de produtos no item.
      // EX: 'MEIA' tem 2 itens, 'INTEIRA' tem 1 item
      if (
        (productsResponse.length === 1 &&
          itemProduct.type === PieceType.METADE) ||
        (productsResponse.length === 2 &&
          itemProduct.type === PieceType.INTEIRA)
      ) {
        throw new BadRequestException({
          message: `Order not contains ItemProduct. Type="${itemProduct.type}", Product items length="${productsResponse.length}"`,
        });
      }
      // faz o calculo do produto no item
      let productSubTotal: number = 0;
      productsResponse.forEach((product) => {
        productSubTotal += product.price / PIECES_CATEGORY[itemProduct.type];
      });

      // Faz a soma dos produtos e adicional multiplicado pela quantidade de itens
      let subTotal: number =
        itemProduct.quantity * (productSubTotal + aditionalsResponse.subTotal);

      itemProduct.subTotal = +subTotal.toFixed(2);

      // Passa os produtos e adicionais para o formato que vai salvar no banco
      itemProduct.aditionals = aditionalsResponse.aditionals.map((item) =>
        createNewAditionalType(item)
      );
      itemProduct.products = productsResponse.map((item) =>
        createNewProductType(item)
      );

      return itemProduct;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findAditionalByIdsAndCalculate(data?: CreateAditionalByItemDto[]) {
    try {
      if (!data) {
        return { aditionals: [], subTotal: 0 };
      }
      let subTotal: number = 0;
      const aditionalsId: string[] = [];
      const auxPrice: { [key: string]: { id: string; quantity: number } } = {};

      data.forEach((aditional) => {
        aditionalsId.push(aditional.id);
        auxPrice[aditional.id] = {
          id: aditional.id,
          quantity: aditional.quantity,
        };
      });
      const aditionals: Aditional[] =
        await this.aditionalRepository.findManyByIds(aditionalsId);

      // confirma se todos os adicionais estão corretos
      if (!aditionals || aditionalsId.length !== aditionals.length) {
        throw new NotFoundException(exceptionMessages.notFound('Aditional'));
      }
      // calcula adicional * a qtd de adicionais requeridos
      aditionals.forEach((aditional) => {
        aditional.quantity = auxPrice[`${aditional.id}`].quantity;
        subTotal += aditional.quantity * aditional.price;
      });
      return {
        aditionals,
        subTotal,
      };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
  async findByQuery(query?: OrderQueryParamsDto) {
    return await this.orderRepository.findByCurrentDateOrWhere(query);
  }
  findAll() {
    return `This action returns all order`;
  }

  findOne(id: string) {
    return `This action returns a #${id} order`;
  }

  update(id: string, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: string) {
    return `This action removes a #${id} order`;
  }
}
