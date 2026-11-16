import { useState } from "react";
import CurrencyInput from "./components/currencyInput";
import useCurrency from "./hooks/useCurrency";
import { convertAmount } from "./utils/convertAmount";

function App() {

  const [amount, setAmount] = useState(1);

  const [fromCurrency, setFromCurrency] = useState("USD");

  const [toCurrency, setToCurrency] = useState("INR");

  const [conversion, setConversion] = useState(null);
  const [error, setError] = useState("");

  const currencies = ["USD", "INR", "EUR", "GBP", "JPY"];

  const rates = useCurrency(fromCurrency);

  const convertCurrency = () => {
    const rate = fromCurrency === toCurrency ? 1 : rates[toCurrency];
    try {
      const formatted = convertAmount(amount, rate);
      setError("");
      setConversion({
        amount: String(amount),
        fromCurrency,
        toCurrency,
        rate,
        result: formatted,
      });
    } catch (reason) {
      setConversion(null);
      setError(reason instanceof Error ? reason.message : "Conversion failed.");
    }
  };

  const currentConversion =
    conversion &&
    conversion.amount === String(amount) &&
    conversion.fromCurrency === fromCurrency &&
    conversion.toCurrency === toCurrency &&
    conversion.rate === (fromCurrency === toCurrency ? 1 : rates[toCurrency])
      ? conversion
      : null;

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">

      <div className="w-full max-w-md bg-gray-800 rounded-2xl p-6">

        <h1 className="text-3xl font-bold text-white text-center mb-6">
          💱 Currency Converter
        </h1>

        <form
          className="space-y-4"
          onSubmit={(event) => {
            event.preventDefault();
            convertCurrency();
          }}
        >

          <CurrencyInput
            amount={amount}
            amountLabel="Amount to convert"
            currencyLabel="Source currency"
            currency={fromCurrency}
            currencies={currencies}
            onAmountChange={(value) => {
              setAmount(value);
              setError("");
              setConversion(null);
            }}
            onCurrencyChange={(value) => {
              setFromCurrency(value);
              setError("");
              setConversion(null);
            }}
          />

          <CurrencyInput
            amount={currentConversion ? currentConversion.result : ""}
            readOnly
            amountLabel="Converted amount"
            currencyLabel="Target currency"
            currency={toCurrency}
            currencies={currencies}
            onAmountChange={() => {}}
            onCurrencyChange={(value) => {
              setToCurrency(value);
              setError("");
              setConversion(null);
            }}
          />

          <button
            type="submit"
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

        </form>

      </div>

    </div>
  );
}

export default App;