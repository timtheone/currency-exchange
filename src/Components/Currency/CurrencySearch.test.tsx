import { render, screen, fireEvent, act } from "@testing-library/react";
import CurrencySearch from "./CurrencySearch";
import React from "react";

jest.spyOn(window.history, "pushState");
jest.spyOn(window.history, "replaceState");
const useStateSpy = jest.spyOn(React, "useState");
const setState = jest.fn();
//@ts-ignore
useStateSpy.mockImplementation((init) => [init, setState]);

describe("Currency Search test", () => {
  test("form is rendered", () => {
    render(<CurrencySearch setSearchTerm={setState} searchTerm="" />);

    const currencySearch = screen.getByTestId("CurrencySearch_Form");
    expect(currencySearch).toBeInTheDocument();
  });

  test("input value is and deeplink update correctly when there is a search term", () => {
    render(<CurrencySearch setSearchTerm={setState} searchTerm="" />);

    const currencySearchInput = screen.getByTestId(
      "CurrencySearch_Input"
    ) as HTMLInputElement;

    fireEvent.change(currencySearchInput, { target: { value: "aud" } });

    expect(window.history.pushState).toHaveBeenCalledWith(null, "", "#aud");
    expect(setState).toHaveBeenCalledWith("aud");
  });

  test("input value is and deeplink update correctly", () => {
    render(<CurrencySearch setSearchTerm={setState} searchTerm="test" />);

    const currencySearchInput = screen.getByTestId(
      "CurrencySearch_Input"
    ) as HTMLInputElement;

    fireEvent.change(currencySearchInput, { target: { value: "" } });

    expect(window.history.replaceState).toHaveBeenCalledWith(null, "", ".");
    expect(setState).toHaveBeenCalledWith("");
  });
});
