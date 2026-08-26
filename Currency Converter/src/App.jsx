import { useState } from "react";
import CurrencyInput from "./components/CurrencyInput";
import useCurrency from "./hooks/useCurrency";

function App() {

  const [amount, setAmount] = useState(1);

  const [fromCurrency, setFromCurrency] = useState("USD");

  const [toCurrency, setToCurrency] = useState("INR");

  const [convertedAmount, setConvertedAmount] = useState(0);

  const currencies = ["USD", "INR", "EUR", "GBP", "JPY"];

  const rates = useCurrency(fromCurrency);

  const convertCurrency = () => {

    if (!amount) return;

    const rate = rates[toCurrency];

    const result = Number(amount) * rate;

    setConvertedAmount(result.toFixed(2));
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">

      <div className="w-full max-w-md bg-gray-800 rounded-2xl p-6">

        <h1 className="text-3xl font-bold text-white text-center mb-6">
          💱 Currency Converter
        </h1>

        <div className="space-y-4">

          <CurrencyInput
            amount={amount}
            currency={fromCurrency}
            currencies={currencies}
            onAmountChange={setAmount}
            onCurrencyChange={setFromCurrency}
          />

          <CurrencyInput
            amount=""
            currency={toCurrency}
            currencies={currencies}
            onAmountChange={() => {}}
            onCurrencyChange={setToCurrency}
          />

          <button
            onClick={convertCurrency}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700"
          >
            Convert
          </button>

          <div className="text-center text-white text-2xl font-bold">
            {convertedAmount} {toCurrency}
          </div>

        </div>

      </div>

    </div>
  );
}

export default App;