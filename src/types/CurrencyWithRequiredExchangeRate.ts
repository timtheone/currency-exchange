import Currency from "./Currency";
import Rate from "./CurrencyRate";

type CurrencyWithRequiredExchangeRate = Omit<Currency, "exchangeRate"> & {
  exchangeRate: Rate;
};

export default CurrencyWithRequiredExchangeRate;
