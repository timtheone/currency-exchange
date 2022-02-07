import { render, screen } from "@testing-library/react";
import CurrencyList from "./CurrencyList";
import setupIntersectionObserverMock from "../../testUtils/intersectionObserverMock";
import * as useNormalizedCurrencyDataHook from "./useNormalizedCurrencyData";

beforeAll(() => {
  setupIntersectionObserverMock();
});

describe("CurrencyList test", () => {
  test("that component rendered list when data was loaded", () => {
    const transformedData = [
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
        uuid: "1",
      },
    ];
    const baseCurrency = "EUR";
    const isLoading = false;
    jest
      .spyOn(useNormalizedCurrencyDataHook, "useNormalizedCurrencyData")
      // @ts-ignore
      .mockImplementation(() => ({ transformedData, baseCurrency, isLoading }));
    render(<CurrencyList searchTerm="" />);

    const currencyListItem = screen.getByTestId("CurrencyListItem");
    expect(currencyListItem).toBeInTheDocument();
  });

  test("that component renders loading indicator whilst loading data", () => {
    const transformedData = [
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
        uuid: "1",
      },
    ];
    const baseCurrency = "EUR";
    const isLoading = true;
    jest
      .spyOn(useNormalizedCurrencyDataHook, "useNormalizedCurrencyData")
      // @ts-ignore
      .mockImplementation(() => ({ transformedData, baseCurrency, isLoading }));
    render(<CurrencyList searchTerm="" />);

    const loadingText = screen.getByText(/Loading.../i);
    expect(loadingText).toBeInTheDocument();
  });

  test("that component filters correctly based on search term", () => {
    const transformedData = [
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
        uuid: "1",
      },
    ];
    const baseCurrency = "EUR";
    const isLoading = false;
    jest
      .spyOn(useNormalizedCurrencyDataHook, "useNormalizedCurrencyData")
      // @ts-ignore
      .mockImplementation(() => ({ transformedData, baseCurrency, isLoading }));
    render(<CurrencyList searchTerm="AUD" />);

    const currencyListItem = screen.getByTestId("CurrencyListItem");
    expect(currencyListItem).toBeInTheDocument();
  });
});
