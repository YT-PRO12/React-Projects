import { useEffect, useState } from "react";
import { validateRates } from "../utils/validateRates";

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
        const validRates = validateRates(result, currency);
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
