import { useState } from "react";
import CurrencyInput from "./components/currencyInput";
import useCurrency from "./hooks/useCurrency";

function App() {

  const [amount, setAmount] = useState(1);

  const [fromCurrency, setFromCurrency] = useState("USD");

  const [toCurrency, setToCurrency] = useState("INR");

  const [conversion, setConversion] = useState(null);
  const [error, setError] = useState("");

  const currencies = ["USD", "INR", "EUR", "GBP", "JPY"];

  const rates = useCurrency(fromCurrency);

  const convertCurrency = () => {
    const numericAmount = Number(amount);
    const rate = rates[toCurrency];

    if (String(amount).trim() === "" || !Number.isFinite(numericAmount) || numericAmount < 0) {
      setError("Enter a valid, non-negative amount.");
      setConversion(null);
      return;
    }

    if (typeof rate !== "number" || !Number.isFinite(rate) || rate <= 0) {
      setError("Exchange rates are unavailable. Please try again.");
      setConversion(null);
      return;
    }

    const result = numericAmount * rate;
    if (!Number.isFinite(result)) {
      setError("Amount is too large to convert.");
      setConversion(null);
      return;
    }

    setError("");
    setConversion({
      amount: String(amount),
      fromCurrency,
      toCurrency,
      rate,
      result: result.toFixed(2),
    });
  };

  const currentConversion =
    conversion &&
    conversion.amount === String(amount) &&
    conversion.fromCurrency === fromCurrency &&
    conversion.toCurrency === toCurrency &&
    conversion.rate === rates[toCurrency]
      ? conversion
      : null;

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">

      <div className="w-full max-w-md bg-gray-800 rounded-2xl p-6">

        <h1 className="text-3xl font-bold text-white text-center mb-6">
          💱 Currency Converter
        </h1>

        <div className="space-y-4">

          <CurrencyInput
            amount={amount}
            amountLabel="Amount to convert"
            currencyLabel="Source currency"
            currency={fromCurrency}
            currencies={currencies}
            onAmountChange={setAmount}
            onCurrencyChange={setFromCurrency}
          />

          <CurrencyInput
            amount={currentConversion ? currentConversion.result : ""}
            readOnly
            amountLabel="Converted amount"
            currencyLabel="Target currency"
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

          {error && (
            <p className="text-red-300 text-sm" role="alert">
              {error}
            </p>
          )}

          <div className="text-center text-white text-2xl font-bold" aria-live="polite">
            {currentConversion ? `${currentConversion.result} ${toCurrency}` : "—"}
          </div>

        </div>

      </div>

    </div>
  );
}

export default App;