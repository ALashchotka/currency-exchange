import axios from "axios";
import { useEffect } from "react";
import { Alert } from "react-native";
import { useShallow } from "zustand/react/shallow";

import { IStore, useStore } from "@/store";

export const useRates = () => {
  const { rates, setRates, sourceCurrencyCode } = useStore(
    useShallow((state: IStore) => ({
      rates: state.rates[state.sourceCurrencyCode],
      setRates: state.setRates,
      sourceCurrencyCode: state.sourceCurrencyCode,
    }))
  );

  useEffect(() => {
    const fetchRates = async () => {
      try {
        const response = await axios(
          `https://api.vatcomply.com/rates?base=${sourceCurrencyCode}`
        );

        setRates(response.data);
      } catch (error) {
        Alert.alert(
          "",
          `Something went wrong while loading the exchange rates. Make sure you're connected to the internet and try again. You can continue using the app with the last available rates for now.`
        );
      }
    };

    fetchRates();
  }, [setRates, sourceCurrencyCode]);

  return rates;
};
