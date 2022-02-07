import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import Currency from "../../types/Currency";
import CurrencyData from "../../types/CurrencyData";
import NormalizedCurrency from "../../types/NormalizedCurrency";
import mapCountryCodeToCountryName from "../../utils/mapCountryCodetoCountryName";
import CurrencyWithRequiredExchangeRate from "../../types/CurrencyWithRequiredExchangeRate";
import { v4 as uuidv4 } from "uuid";

const API_URL = "https://run.mocky.io/v3/c88db14a-3128-4fbd-af74-1371c5bb0343";

const getCountryFlagFromCurrency = (currency: string) => {
  return currency.substring(0, 2).toLowerCase();
};

export function normalizeData(data: Currency[]) {
  return data
    .filter((currency): currency is CurrencyWithRequiredExchangeRate => {
      return currency.hasOwnProperty("exchangeRate");
    })
    .map((currency) => {
      const countryName = mapCountryCodeToCountryName(currency.currency);
      const countryFlag = getCountryFlagFromCurrency(currency.currency);
      let exhangeRate: string = currency.exchangeRate.middle.toString();
      const baseValue = 1 / currency.exchangeRate?.middle;
      let precision = currency.precision;
      let precisionedValue = baseValue.toFixed(precision);

      while (parseFloat(precisionedValue) === 0) {
        precision += 1;
        precisionedValue = baseValue.toFixed(precision);
      }

      exhangeRate = precisionedValue;

      return {
        ...currency,
        ...{ countryName: countryName },
        ...{ countryFlag: countryFlag },
        ...{ uuid: uuidv4() },
        ...{ rateByBaseValue: exhangeRate },
      };
    });
}

export function useNormalizedCurrencyData(): {
  transformedData: NormalizedCurrency[] | null;
  baseCurrency: string;
  isLoading: boolean;
} {
  const { apiData, isLoading } = useFetch<CurrencyData>(API_URL);

  const [transformedData, setTransformedData] =
    useState<Array<NormalizedCurrency> | null>(null);

  const [baseCurrency, setBaseCurrency] = useState("");

  useEffect(() => {
    if (apiData) {
      const transform = normalizeData(apiData.fx);
      setTransformedData(transform);
      setBaseCurrency(apiData.baseCurrency);
    }
  }, [apiData]);

  return { transformedData, baseCurrency, isLoading };
}
