import type { Currency } from "./currency";

interface MongoDefaultId {
  _id?: string;
}

export interface Finance extends MongoDefaultId {
  amount: number;
  currency: Currency;
  description: string;
  date: Date;
  secretKey: string;
}
