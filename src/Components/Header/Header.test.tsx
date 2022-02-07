import { render, screen } from "@testing-library/react";
import Header from "./Header";

describe("testing Header", () => {
  test("header renders", () => {
    render(<Header />);

    const header = screen.getByText(/Currency Tracker/i);

    expect(header).toBeInTheDocument();
  });
});
