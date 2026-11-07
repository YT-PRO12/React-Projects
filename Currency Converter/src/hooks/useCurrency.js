import { useEffect, useState } from "react";

function useCurrency(currency) {
  const [data, setData] = useState({});

  useEffect(() => {
    const controller = new AbortController();
    setData({});

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
          Array.isArray(result.rates)
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
        if (!controller.signal.aborted) setData(validRates);
      } catch (error) {
        if (!controller.signal.aborted) {
          console.error("Could not load exchange rates", error);
          setData({});
        }
      }
    }

    loadRates();
    return () => controller.abort();
  }, [currency]);

  return data;
}

export default useCurrency;
