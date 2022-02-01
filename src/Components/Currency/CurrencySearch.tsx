import { Dispatch, ChangeEvent, SetStateAction } from "react";

type Props = {
  setSearchTerm: Dispatch<SetStateAction<string>>;
  searchTerm: string;
};

export default function CurrencySearch({ setSearchTerm, searchTerm }: Props) {
  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    if (event.target.value !== "") {
      window.history.pushState(null, "", `#${event.target.value}`);
    } else {
      window.history.replaceState(null, "", ".");
    }
  };

  return (
    <form className="sticky top-0 right-0">
      <input
        type="text"
        placeholder="Seach currencies"
        onChange={handleSearch}
        className={`border-blue-800 w-full`}
        value={searchTerm}
      />
    </form>
  );
}
