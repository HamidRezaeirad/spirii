import { HttpModule } from '@nestjs/axios';
import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';

@Module({
  imports: [HttpModule, CacheModule.register()],
  providers: [TransactionService],
})
export class TransactionModule {}
