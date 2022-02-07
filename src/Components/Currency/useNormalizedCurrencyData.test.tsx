import { renderHook } from "@testing-library/react-hooks";
import { useNormalizedCurrencyData } from "./useNormalizedCurrencyData";
import fetchMock from "jest-fetch-mock";

beforeEach(async function () {
  fetchMock.resetMocks();
});

describe("testing useNormalizedCurrencyData", () => {
  test("that hook returns correct data", async () => {
    fetchMock.mockResponseOnce(
      JSON.stringify({
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
      })
    );

    const { result, waitForValueToChange } = renderHook(() =>
      useNormalizedCurrencyData()
    );

    await waitForValueToChange(() => result.current.transformedData);

    expect(result.current.transformedData).toMatchObject([
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

    expect(result.current.baseCurrency).toBe("EUR");
  });
});
