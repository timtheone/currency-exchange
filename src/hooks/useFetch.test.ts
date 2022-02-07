import { renderHook } from "@testing-library/react-hooks";
import useFetch from "./useFetch";
import fetchMock from "jest-fetch-mock";

beforeEach(async function () {
  fetchMock.resetMocks();
});

describe("testing useFetch", () => {
  it("fetches data and sets api data state correctly", async () => {
    fetchMock.mockResponseOnce(JSON.stringify({ data: "12345" }));
    const { result, waitForValueToChange } = renderHook(() =>
      useFetch("http://test")
    );

    await waitForValueToChange(() => result.current.apiData);

    expect(result.current.apiData).toMatchObject({ data: "12345" });

    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it("sets errors if fetch promise rejected", async () => {
    let initialValue = "https://test";
    fetchMock.mockRejectOnce(() => Promise.reject("Some Error"));
    const { result, waitForNextUpdate } = renderHook(() =>
      useFetch(initialValue)
    );

    await waitForNextUpdate();

    expect(result.current.error).toBe(true);
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it("changes isLoading value", async () => {
    let initialValue = "https://test";
    fetchMock.mockResponseOnce(JSON.stringify({ data: "12345" }));
    const { result, waitForNextUpdate } = renderHook(() =>
      useFetch(initialValue)
    );

    expect(result.current.isLoading).toBe(true);

    await waitForNextUpdate();

    expect(result.current.isLoading).toBe(false);
  });
});
