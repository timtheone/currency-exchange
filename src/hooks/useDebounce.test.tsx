import useDebounce from "./useDebounce";
import { renderHook, act } from "@testing-library/react-hooks";

jest.useFakeTimers();

describe("useDebounce", () => {
  it("should be defined", () => {
    expect(useDebounce).toBeDefined();
  });

  test("that it returns a new value after a delay", async () => {
    let initialValue = "test";
    const { result, rerender } = renderHook(() =>
      useDebounce(initialValue, 250)
    );
    initialValue = "another value";
    rerender();

    expect(result.current).toEqual("test");

    act(() => {
      jest.advanceTimersByTime(250);
    });

    expect(result.current).toEqual("another value");
  });

  test("that it keeps the initial value if update happened before set delay", async () => {
    let initialValue = "test";
    const { result, rerender } = renderHook(() =>
      useDebounce(initialValue, 250)
    );
    initialValue = "another value";
    rerender();

    expect(result.current).toEqual("test");

    act(() => {
      jest.advanceTimersByTime(200);
    });

    expect(result.current).toEqual("test");
  });
});
