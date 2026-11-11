import { useId } from "react";

function CurrencyInput({
  amount,
  currency,
  currencies,
  onAmountChange,
  onCurrencyChange,
  readOnly = false,
  amountLabel = "Amount",
  currencyLabel = "Currency",
}) {
  const id = useId();

  return (
    <div className="flex gap-3">
      <label className="sr-only" htmlFor={id + "-amount"}>
        {amountLabel}
      </label>
      <input
        id={id + "-amount"}
        type="number"
        inputMode="decimal"
        step="any"
        value={amount}
        onChange={(event) => onAmountChange(event.target.value)}
        readOnly={readOnly}
        min="0"
        className="w-full rounded-lg p-3"
      />

      <label className="sr-only" htmlFor={id + "-currency"}>
        {currencyLabel}
      </label>
      <select
        id={id + "-currency"}
        value={currency}
        onChange={(event) => onCurrencyChange(event.target.value)}
        className="rounded-lg p-3"
      >
        {currencies.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export default CurrencyInput;
