import { useEffect, useState } from "react";

function useCurrency(currency) {

  const [data, setData] = useState({});

  useEffect(() => {

    fetch(`https://open.er-api.com/v6/latest/${currency}`)
      .then((response) => response.json())
      .then((result) => {
        setData(result.rates);
      });

  }, [currency]);

  return data;
}

export default useCurrency;