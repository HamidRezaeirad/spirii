import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AggregateModule } from './aggregate/aggregate.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TransactionModule } from './transaction/transaction.module';

@Module({
  imports: [AggregateModule, TransactionModule, ConfigModule.forRoot()],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
