import Currency from "./Currency";

type NormalizedCurrency = Currency & {
  countryName: string;
  countryFlag: string;
  rateByBaseValue: string | boolean;
  uuid: string;
};

export default NormalizedCurrency;
