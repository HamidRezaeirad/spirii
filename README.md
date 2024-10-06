<h1>Robot Programming Backend</h1>

Hi.

Task
Let’s imagine you play a game where you can earn scores.
With scores, you can then buy some products in the game or transfer them to your bank account.
Whether you earn, spend, or request a payout, a new transaction is created in the transaction service that is available by API.

Write an MVP of data aggregation microservice that will collect transactions from transaction API and expose its own API endpoints:

1. Get aggregated data by user Id: balance, earned, spent, payout, paid out
2. Get list of requested payouts (user ID, payout amount), if there are several payouts requested by a user, then the amount must be aggregated into one.

Pre-conditions:

1. Service will have millions of requests per day
2. Data must be up to date with less than 2 minute’s delay
3. You have limited access to transaction API (5 requests per minute, with limit 1000 transactions)
4. You can use NestJS or any other framework
5. You can mock transaction API entirely so that we can run your app
6. Exchange rate is 1 SCR = 1 EUR

## Used Technologies and Patterns

- NestJS - The main structure of the application.

## Main Sections

- API endpoints

## API endpoints

- Transaction APIs.
- Aggregation APIs.

## Postman documents

Postman API endpoint documents and environment are available in the postman-docs folder.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## App is running

```bash
$ http://localhost:3000 Transaction service
$ http://localhost:3001 Aggregation Service

```
