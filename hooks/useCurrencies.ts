import axios from "axios";
import { SplashScreen } from "expo-router";
import { useEffect } from "react";
import { Alert } from "react-native";
import { useShallow } from "zustand/react/shallow";

import currencies from "@/assets/json/currencies.json";
import { TCurrency } from "@/constants/types";
import { IStore, useStore } from "@/store";

export const useCurrencies = () => {
  const {
    setCurrencies,
    setSourceCurrencyCode,
    setTargetCurrencyCode,
    sourceCurrencyCode,
    targetCurrencyCode,
  } = useStore(
    useShallow((state: IStore) => ({
      setCurrencies: state.setCurrencies,
      setSourceCurrencyCode: state.setSourceCurrencyCode,
      setTargetCurrencyCode: state.setTargetCurrencyCode,

      sourceCurrencyCode: state.sourceCurrencyCode,
      targetCurrencyCode: state.targetCurrencyCode,
    }))
  );

  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        const response = await axios("https://api.vatcomply.com/currencies");

        const parsedCurrencies = Object.keys(response.data)
          .map((key) => currencies.find(({ code }) => code === key))
          .filter(Boolean) as TCurrency[];

        setCurrencies(parsedCurrencies);
        setSourceCurrencyCode(sourceCurrencyCode || parsedCurrencies[0].code);
        setTargetCurrencyCode(targetCurrencyCode || parsedCurrencies[1].code);

        SplashScreen.hide();
      } catch (error) {
        Alert.alert(
          "",
          "Oops! We couldn't load the list of available currencies. Please check your internet connection and try again. You can still use the app with previously loaded data in the meantime."
        );

        if (!sourceCurrencyCode) {
          setCurrencies(currencies);
          setSourceCurrencyCode(currencies[0].code);
          setTargetCurrencyCode(currencies[1].code);
        }

        SplashScreen.hide();
      }
    };

    fetchCurrencies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setCurrencies, setSourceCurrencyCode, setTargetCurrencyCode]);
};
