import CurrencyList from "./Components/Currency/CurrencyList";
import CurrencySearch from "./Components/Currency/CurrencySearch";
import Header from "./Components/Header/Header";
import { useState } from "react";

function App() {
  const [searchTerm, setSearchTerm] = useState<string>(
    window.location.hash.substring(1)
  );

  return (
    <div className="App">
      <Header />
      <div className="container mx-auto">
        <CurrencySearch setSearchTerm={setSearchTerm} searchTerm={searchTerm} />
        <CurrencyList searchTerm={searchTerm} />
      </div>
    </div>
  );
}

export default App;
