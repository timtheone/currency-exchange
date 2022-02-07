import { useNormalizedCurrencyData } from "./useNormalizedCurrencyData";
import useDebounce from "../../hooks/useDebounce";
import CurrencyListItem from "./CurrencyListItem";

type Props = {
  searchTerm: string;
};

export default function CurrencyList({ searchTerm }: Props) {
  const { transformedData, baseCurrency, isLoading } =
    useNormalizedCurrencyData();
  const debouncedSearchTerm: string = useDebounce<string>(searchTerm, 250);

  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <ul className="px-3 lg:px-0">
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
              .map((currency) => (
                <CurrencyListItem
                  key={currency.uuid}
                  {...currency}
                  baseCurrency={baseCurrency}
                />
              ))}
        </ul>
      )}
    </>
  );
}
