import { render, screen, fireEvent } from "@testing-library/react";
import FlagImage from "./FlagImage";

describe("Flag image renders correctly", () => {
  test("rendres flag", () => {
    render(<FlagImage countryFlag="au" countryName="Australia" />);

    const flagImage = screen.getByAltText("Australia flag");
    expect(flagImage).toBeInTheDocument();
  });

  test("renders default flag when failed to find flag image in assets", () => {
    render(<FlagImage countryFlag="au" countryName="Australia" />);

    expect(screen.queryByAltText("Generic flag")).toBeNull();

    fireEvent(screen.getByAltText("Australia flag"), new Event("error"));

    const defaultImageAfter = screen.queryByAltText("Generic flag");
    expect(defaultImageAfter).not.toBeNull();
  });
});
