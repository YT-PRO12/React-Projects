import { useEffect, useState } from "react";

function useCurrency(currency) {
  const [snapshot, setSnapshot] = useState({ base: null, rates: {} });

  useEffect(() => {
    const controller = new AbortController();
    setSnapshot({ base: currency, rates: {} });

    async function loadRates() {
      try {
        const response = await fetch(
          `https://open.er-api.com/v6/latest/${encodeURIComponent(currency)}`,
          { signal: controller.signal }
        );
        if (!response.ok) throw new Error("Currency request failed");
        const result = await response.json();
        if (
          result?.result !== "success" ||
          !result.rates ||
          typeof result.rates !== "object" ||
          Array.isArray(result.rates) ||
          (result.base_code != null && result.base_code !== currency)
        ) {
          throw new Error("Currency response is unavailable");
        }

        const validRates = Object.fromEntries(
          Object.entries(result.rates).filter(
            ([code, rate]) =>
              /^[A-Z]{3}$/.test(code) &&
              typeof rate === "number" &&
              Number.isFinite(rate) &&
              rate > 0
          )
        );
        if (Object.keys(validRates).length === 0) {
          throw new Error("No valid exchange rates were returned");
        }
        if (!controller.signal.aborted) setSnapshot({ base: currency, rates: validRates });
      } catch (error) {
        if (!controller.signal.aborted) {
          console.error("Could not load exchange rates", error);
          setSnapshot({ base: currency, rates: {} });
        }
      }
    }

    loadRates();
    return () => controller.abort();
  }, [currency]);

  return snapshot.base === currency ? snapshot.rates : {};
}

export default useCurrency;
