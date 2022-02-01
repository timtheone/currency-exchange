import Rate from "./CurrencyRate";

interface Currency {
  currency: string;
  banknoteRate?: Rate;
  exchangeRate?: Rate;
  flags?: string[];
  nameI18N?: string;
  precision: number;
  denominations?: number[];
}

export default Currency;
