function CurrencyInput({
  amount,
  currency,
  currencies,
  onAmountChange,
  onCurrencyChange
}) {

  return (
    <div className="flex gap-3">

      <input
        type="number"
        value={amount}
        onChange={(e) => onAmountChange(e.target.value)}
        className="w-full rounded-lg p-3"
      />

      <select
        value={currency}
        onChange={(e) => onCurrencyChange(e.target.value)}
        className="rounded-lg p-3"
      >
        {currencies.map((currency) => (
          <option key={currency} value={currency}>
            {currency}
          </option>
        ))}
      </select>

    </div>
  );
}

export default CurrencyInput;