import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CountOrderRepository } from './../repositories/count-order.repository';
import { CountOrder } from './../../common/entities/count-order.entity';

@Injectable()
export class CountOrderService {
  constructor(private readonly countOrderRepository: CountOrderRepository) {}
  async getNextOrderId(): Promise<number> {
    const currentDate = this.getCurrentDate();
    const { id, count, date } = await this.getOrCreateCountOrder(currentDate);
    await this.countOrderRepository.update(id, {
      count: count + 1,
      date,
    });
    return count;
  }
  private async getOrCreateCountOrder(date: Date) {
    try {
      let countOrderData = await this.countOrderRepository.getByDate(date);
      if (!countOrderData) {
        const countOrder: CountOrder = {
          count: 1,
          date,
        };
        countOrderData = await this.countOrderRepository.create(countOrder);
      }
      return countOrderData;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  private getCurrentDate(): Date {
    let auxDate = new Date();
    return new Date(
      auxDate.getFullYear(),
      auxDate.getMonth(),
      auxDate.getDate()
    );
  }
}
