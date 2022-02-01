import useNormalizedCurrencyData from "./useNormalizedCurrencyData";
import useDebounce from "../../hooks/useDebounce";
import CurrencyListItem from "./CurrencyListItem";

type Props = {
  searchTerm: string;
};

export default function CurrencyList({ searchTerm }: Props) {
  const { isLoading, transformedData, baseCurrency } =
    useNormalizedCurrencyData();
  const debouncedSearchTerm: string = useDebounce<string>(searchTerm, 250);

  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {transformedData &&
            transformedData
              .filter((element) => {
                if (debouncedSearchTerm !== "") {
                  return element.currency
                    .toLocaleLowerCase()
                    .includes(debouncedSearchTerm.toLocaleLowerCase());
                } else {
                  return element;
                }
              })
              .map((currency, i) => (
                <CurrencyListItem
                  key={i}
                  {...currency}
                  baseCurrency={baseCurrency}
                />
              ))}
        </ul>
      )}
    </>
  );
}
