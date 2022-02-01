import Currency from "./Currency";

type CurrencyData = {
  baseCurrency: string;
  comparisonDate: string;
  insitute: number;
  lastUpdated: string;
  fx: Currency[];
};

export default CurrencyData;
