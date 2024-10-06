import { Injectable } from '@nestjs/common';
import { AggregatedData } from 'src/interfaces/aggregatedData.interface';
import { AggregatedPayouts } from 'src/interfaces/aggregatedPayouts.interface';
import { Transactions } from 'src/interfaces/transactions.interface';

@Injectable()
export class AggregateService {
  constructor() {}

  getAggregatedDataByUserId(
    data: Transactions,
    userId: string,
  ): AggregatedData {
    // Initialize the aggregation object
    const aggregatedData: AggregatedData = {
      userId: parseInt(userId),
      balance: 0,
      earned: 0,
      spent: 0,
      payout: 0,
      paidOut: 0,
    };

    // Iterate through each item in the data
    data.items.forEach((item) => {
      if (item.userId === userId) {
        const amount = parseFloat(item.amount.toString());

        switch (item.type) {
          case 'earned':
            aggregatedData.earned += amount;
            break;
          case 'spent':
            aggregatedData.spent += amount;
            break;
          case 'payout':
            aggregatedData.payout += amount;
            break;
          case 'paidOut':
            aggregatedData.paidOut += amount;
            break;
          default:
            break;
        }
      }
    });

    // Calculate the balance
    aggregatedData.balance = aggregatedData.earned - aggregatedData.spent;

    return aggregatedData;
  }

  getAggregatedPayouts(data: Transactions): AggregatedPayouts[] {
    const payouts = {};

    // Iterate through each item in the response
    data.items.forEach((item) => {
      // Only consider items with type "payout"
      if (item.type === 'payout') {
        const userId: string = item.userId;
        const amount: number = parseFloat(item.amount.toString());

        // If userId already exists in payouts, aggregate the amount
        if (payouts[userId]) {
          payouts[userId] += amount;
        } else {
          payouts[userId] = amount;
        }
      }
    });

    // Convert the payouts object into a list of {userId, payoutAmount} objects
    const payoutList = Object.keys(payouts).map((userId) => {
      return { userId: userId, payoutAmount: payouts[userId] };
    });

    return payoutList;
  }
}
