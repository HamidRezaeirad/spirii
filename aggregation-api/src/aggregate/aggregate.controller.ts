import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Controller, Get, Inject, Param } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { AggregatedData } from 'src/interfaces/aggregatedData.interface';
import { AggregatedPayouts } from 'src/interfaces/aggregatedPayouts.interface';
import { TransactionService } from 'src/transaction/transaction.service';
import { AggregateService } from './aggregate.service';

@Controller('aggregate')
export class AggregateController {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private transactionService: TransactionService,
    private aggregateService: AggregateService,
  ) {}

  @Get('/user-aggregated/:userId')
  async getAggregatedDataByUserId(@Param('userId') userId) {
    // check if data is in cache:
    const cachedData = await this.cacheManager.get<AggregatedData>(
      userId.toString(),
    );
    if (cachedData) {
      console.log(`Getting data from cache!`);
      return cachedData;
    }

    const data = await this.transactionService.getProducts();
    if (data) {
      const res = this.aggregateService.getAggregatedDataByUserId(data, userId);
      await this.cacheManager.set(userId.toString(), res, 120000);
      console.log(`Getting data from AP!`);
      return res;
    } else {
      return { message: 'service is busy!' };
    }
  }

  @Get('/aggregated-payouts')
  async getAggregatedPayouts() {
    // check if data is in cache:
    const cachedData =
      await this.cacheManager.get<AggregatedPayouts>('AggregatedPayouts');
    if (cachedData) {
      console.log(`Getting data from cache!`);
      return cachedData;
    }

    const data = await this.transactionService.getProducts();
    if (data) {
      const res = this.aggregateService.getAggregatedPayouts(data);
      await this.cacheManager.set('AggregatedPayouts', res, 120000);
      console.log(`Getting data from AP!`);
      return res;
    } else {
      return { message: 'service is busy!' };
    }
  }
}
