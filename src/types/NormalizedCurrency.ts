import Currency from "./Currency";

type NormalizedCurrency = Currency & {
  countryName: string;
  countryFlag: string;
  rateByBaseValue: string | boolean;
};

export default NormalizedCurrency;
