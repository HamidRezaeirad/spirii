import { HttpModule } from '@nestjs/axios';
import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { TransactionService } from 'src/transaction/transaction.service';
import { AggregateController } from './aggregate.controller';
import { AggregateService } from './aggregate.service';

@Module({
  imports: [HttpModule, CacheModule.register()],
  providers: [AggregateService, TransactionService],
  controllers: [AggregateController],
})
export class AggregateModule {}
