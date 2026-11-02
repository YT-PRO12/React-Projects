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
        if (result.result !== "success" || !result.rates) {
          throw new Error("Currency response is unavailable");
        }
        if (!controller.signal.aborted) setData(result.rates);
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
