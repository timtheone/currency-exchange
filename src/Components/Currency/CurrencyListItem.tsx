import NormalizedCurrency from "../../types/NormalizedCurrency";
import FlagImage from "./FlagImage";

type Props = NormalizedCurrency & {
  baseCurrency: string;
};
export default function CurrencyListItem({
  countryFlag,
  currency,
  nameI18N,
  countryName,
  rateByBaseValue,
  baseCurrency,
}: Props) {
  return (
    <li data-testid="CurrencyListItem">
      <div className="flex p-3 justify-between">
        <div className="flex">
          <FlagImage countryFlag={countryFlag} countryName={countryName} />
          <div className="ml-3">
            <div className="flex items-baseline">
              <p>{currency}</p>
              <p className="ml-2 text-stone-400 text-sm">{nameI18N}</p>
            </div>
            <p className=" text-stone-500">
              {countryName ? countryName : "No Country given"}
            </p>
          </div>
        </div>
        <p className=" self-center">{`${rateByBaseValue} ${baseCurrency}`}</p>
      </div>
    </li>
  );
}
