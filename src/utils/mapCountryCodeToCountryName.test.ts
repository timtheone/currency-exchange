import mapCountryCodeToCountryName from "./mapCountryCodetoCountryName";

describe("testing mapCountryCodeToCountryName", () => {
  test("that returns correct country if can map", () => {
    const result = mapCountryCodeToCountryName("AUD");

    expect(result).toBe("Australia");
  });

  test("that returns fallback when can't map", () => {
    const result = mapCountryCodeToCountryName("XOF");

    expect(result).toBe("No country given");
  });
});
