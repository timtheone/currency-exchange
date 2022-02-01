import { fireEvent, render, screen } from "@testing-library/react";
import CurrencyListItem from "./CurrencyListItem";
import NormalizedCurrency from "../../types/NormalizedCurrency";

describe("CurrencyList test", () => {
  test("renders a CurrencyList component", () => {
    const currency: NormalizedCurrency = {
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
    };

    render(<CurrencyListItem baseCurrency="EUR" {...currency} />);
    const currencyListItem = screen.getByTestId("CurrencyListItem");
    expect(currencyListItem).toBeInTheDocument();
  });

  test("renders all elements of CurrencyList component", () => {
    const currency: NormalizedCurrency = {
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
    };

    render(<CurrencyListItem baseCurrency="EUR" {...currency} />);
    const flagImage = screen.getByAltText("Australia flag");
    const currencyCode = screen.getByText(/AUD/i);
    const currencyName = screen.getByText(/Australian Dollar/i);
    const countryName = screen.getByText("Australia");
    const exchangeRate = screen.getByText("0.05 EUR");

    expect(flagImage).toBeInTheDocument();
    expect(currencyCode).toBeInTheDocument();
    expect(currencyName).toBeInTheDocument();
    expect(countryName).toBeInTheDocument();
    expect(exchangeRate).toBeInTheDocument();
  });
});
