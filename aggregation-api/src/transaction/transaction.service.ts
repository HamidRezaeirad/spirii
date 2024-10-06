import { HttpService } from '@nestjs/axios';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { AxiosError } from 'axios';
import { Cache } from 'cache-manager';
import { catchError, firstValueFrom } from 'rxjs';
import { Transactions } from 'src/interfaces/transactions.interface';

@Injectable()
export class TransactionService {
  constructor(
    private readonly httpService: HttpService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async getProducts(): Promise<Transactions> {
    let requestsCount: number =
      await this.cacheManager.get<number>('requestsCount');
    let transactionCount: number =
      await this.cacheManager.get<number>('transactionCount');

    if (!requestsCount) {
      await this.cacheManager.set('requestsCount', 1);
      requestsCount = 1;
    } else {
      await this.cacheManager.set('requestsCount', requestsCount + 1, 600);
      requestsCount = requestsCount + 1;
    }

    if (!transactionCount) {
      await this.cacheManager.set('transactionCount', 0, 600);
      transactionCount = 0;
    }

    if (requestsCount <= 5 && transactionCount < 1000) {
      // Must added to the .env file.
      const TRANSACTIN_API_BASE_URL: string = 'http://localhost:3000';

      const { data } = await firstValueFrom(
        this.httpService
          .get<Transactions>(`${TRANSACTIN_API_BASE_URL}/products`)
          .pipe(
            catchError((error: AxiosError) => {
              console.log(error.response.data);
              throw 'An error happened!';
            }),
          ),
      );

      await this.cacheManager.set(
        'transactionCount',
        transactionCount + data?.meta?.itemCount,
      );
      return data;
    } else {
      return null;
    }
  }
}
