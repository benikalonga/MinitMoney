import axios from "axios";
import { useEffect, useState } from "react";
import { API_BASE } from "src/lib/config";

export type Rate = {
  from: string;
  to: string;
  rate: number;
  timestamp: number;
};

const useGetRate = (props?: { from?: string; to?: string }) => {
  const [fromTo, setFromTo] = useState({
    from: props?.from || "ZAR",
    to: props?.to || "USD",
  });
  const [rate, setRate] = useState<Rate>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState();

  const getRate = async () => {
    setError(undefined);
    setIsLoading(true);
    try {
      const r = await axios.get(
        `${API_BASE}/rates?from=${fromTo.from}&to=${fromTo.to}`
      );
      setRate(r.data);
    } catch (e) {
      setError(e);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (fromTo.from && fromTo.to) {
      getRate();
    }
  }, [fromTo.from, fromTo.to]);

  return {
    fromTo,
    setFromTo,
    rate,
    isLoading,
    error,
  };
};

export default useGetRate;
