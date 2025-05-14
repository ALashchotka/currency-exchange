import { useCurrencies } from "@/hooks/useCurrencies";
import { IStore, useStore } from "@/store";
import { SplashScreen, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const isDataLoaded = useStore(
    (state: IStore) =>
      !!state.currencies.length &&
      !!state.sourceCurrencyCode &&
      !!state.targetCurrencyCode
  );

  useCurrencies();

  if (!isDataLoaded) {
    return null;
  }

  return (
    <>
      <StatusBar style="auto" />

      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="currencySelector" />
      </Stack>
    </>
  );
}
