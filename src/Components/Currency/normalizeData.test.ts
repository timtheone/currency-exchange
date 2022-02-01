import { normalizeData } from "./useNormalizedCurrencyData";
import NormalizedCurrency from "../../types/NormalizedCurrency";
import CurrencyData from "../../types/CurrencyData";

describe("testing normalizaion for currency data", () => {
  test("correctly transforms currency data", () => {
    const initialData: CurrencyData = {
      baseCurrency: "EUR",
      comparisonDate: "someDate",
      insitute: 1,
      lastUpdated: "someDate",
      fx: [
        {
          currency: "AUD",
          exchangeRate: {
            buy: 18,
            middle: 20,
            sell: 22,
            indicator: 0,
            lastModified: "someDate",
          },
          nameI18N: "Australian Dollar",
          precision: 2,
        },
      ],
    };

    const normalizedData: NormalizedCurrency[] = normalizeData(initialData.fx);

    expect(normalizedData).toMatchObject([
      {
        countryFlag: "au",
        countryName: "Australia",
        currency: "AUD",
        exchangeRate: {
          buy: 18,
          indicator: 0,
          lastModified: "someDate",
          middle: 20,
          sell: 22,
        },
        nameI18N: "Australian Dollar",
        precision: 2,
        rateByBaseValue: "0.05",
      },
    ]);
  });

  test("correctly transforms currency when exchange is too small for a given precision point", () => {
    const initialData: CurrencyData = {
      baseCurrency: "EUR",
      comparisonDate: "someDate",
      insitute: 1,
      lastUpdated: "someDate",
      fx: [
        {
          currency: "AUD",
          exchangeRate: {
            buy: 18,
            middle: 200010,
            sell: 22,
            indicator: 0,
            lastModified: "someDate",
          },
          nameI18N: "Australian Dollar",
          precision: 2,
        },
      ],
    };

    const normalizedData: NormalizedCurrency[] = normalizeData(initialData.fx);

    expect(normalizedData[0].rateByBaseValue).toBe("0.000005");
  });

  test("should skip Currencies with no exchange rate given", () => {
    const initialData: CurrencyData = {
      baseCurrency: "EUR",
      comparisonDate: "someDate",
      insitute: 1,
      lastUpdated: "someDate",
      fx: [
        {
          currency: "AUD",
          nameI18N: "Australian Dollar",
          precision: 2,
        },
        {
          currency: "AUD",
          exchangeRate: {
            buy: 18,
            indicator: 0,
            lastModified: "someDate",
            middle: 20,
            sell: 22,
          },
          precision: 2,
        },
      ],
    };

    const normalizedData: NormalizedCurrency[] = normalizeData(initialData.fx);

    expect(normalizedData.length).toBe(1);
  });
});
