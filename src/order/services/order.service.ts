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
interface ICalculateTotalArgs {
  itemsTotal: number;
  deliveryFeeTotal: number;
  formOfPaymentName: PaymentRateType;
  formOfPayment: CreateFormOfPaymentByOrderDto;
}
@Injectable()
export class OrderService {
  constructor(
    private readonly aditionalRepository: AditionalRepository,
    private readonly productService: ProductService
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
      formOfPaymentName: createOrderDto.formOfPaymentName,
    });
    const startDate = new Date().toISOString();

    const order: Order = {
      orderId: 1,
      clientId: createOrderDto.clientId,
      items: itemsResponse.items,
      address: createOrderDto.address,
      isDelivery: createOrderDto.isDelivery,
      deliveryFee: deliveryFee,
      total: payment.total,
      startDate: startDate,
      updateDate: startDate,
      status: DeliveryStatus.PAYMENT_VALIDATION,
      formOfPaymentName: createOrderDto.formOfPaymentName,
      formOfPayment: payment.formOfPayment,
    };

    return order;
    return '[SUCCESS] This action adds a new order';
  }

  async calculateOrderTotal(data: ICalculateTotalArgs) {
    if (data.formOfPayment.name !== data.formOfPaymentName) {
      throw new BadRequestException({
        message: 'Formas de pagamento não coincidem',
      });
    }
    let value: number = data.itemsTotal + data.deliveryFeeTotal;
    let total: number = +(
      value +
      (value * PAYMENT_RATE[data.formOfPaymentName]) / 100
    ).toFixed(2);
    if (
      data.formOfPayment.needChange &&
      data.formOfPaymentName === PaymentRateType.DINHEIRO
    ) {
      data.formOfPayment.totalChanged = +(
        data.formOfPayment.totalReceived - total
      ).toFixed(2);
    }
    return {
      total,
      formOfPayment: data.formOfPayment,
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
      const aditionalsResponse = await this.findAditionalByIds(
        itemProduct?.aditionals
      );

      const productsId: string[] = [];
      itemProduct.products!.forEach((product) => {
        productsId.push(product.id);
      });

      const productsResponse = await this.productService.findProductById(
        productsId
      );

      if (
        (productsResponse.length === 1 &&
          itemProduct.formatPiece === PieceType.METADE) ||
        (productsResponse.length === 2 &&
          itemProduct.formatPiece === PieceType.INTEIRA)
      ) {
        throw new BadRequestException({
          message: 'Order not contains ItemProduct',
        });
      }

      let productSubTotal: number = 0;
      productsResponse.forEach((product) => {
        productSubTotal +=
          product.price / PIECES_CATEGORY[itemProduct.formatPiece];
      });

      let subTotal: number =
        itemProduct.quantity * productSubTotal +
        itemProduct.quantity * aditionalsResponse.subTotal;

      itemProduct.subTotal = +subTotal.toFixed(2);
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

  async findAditionalByIds(data?: CreateAditionalByItemDto[]) {
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
      if (!aditionals || aditionalsId.length !== aditionals.length) {
        throw new NotFoundException(exceptionMessages.notFound('product'));
      }
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
