import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { TCurrency, TRates } from "@/constants/types";

export interface IStore {
  currencies: TCurrency[];
  setCurrencies: (currencies: TCurrency[]) => void;

  sourceCurrencyCode: TCurrency["code"];
  setSourceCurrencyCode: (currencyCode: TCurrency["code"]) => void;

  targetCurrencyCode: TCurrency["code"] | null;
  setTargetCurrencyCode: (currencyCode: TCurrency["code"]) => void;

  rates: Record<TCurrency["code"], TRates>;
  setRates: ({
    base,
    rates,
  }: {
    base: TCurrency["code"];
    rates: TRates;
  }) => void;
}

export const useStore = create<IStore>()(
  persist(
    (set, get) => ({
      currencies: [],
      setCurrencies: (currencies: TCurrency[]) => set(() => ({ currencies })),

      sourceCurrencyCode: "USD",
      setSourceCurrencyCode: (currencyCode: TCurrency["code"]) =>
        set({ sourceCurrencyCode: currencyCode }),

      targetCurrencyCode: "EUR",
      setTargetCurrencyCode: (currencyCode: TCurrency["code"]) =>
        set({ targetCurrencyCode: currencyCode }),

      rates: {},
      setRates: ({ base, rates }: { base: TCurrency["code"]; rates: TRates }) =>
        set({ rates: { ...get().rates, [base]: rates } }),
    }),
    {
      name: "currency-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
