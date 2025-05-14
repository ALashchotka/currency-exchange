import { router } from "expo-router";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { useShallow } from "zustand/react/shallow";

import SwitchIcon from "@/assets/svg/switch.svg";

import { Calculation, CurrencySelector } from "@/components";
import { TCurrency } from "@/constants/types";
import { IStore, useStore } from "@/store";

export default function MainScreen() {
  const {
    sourceCurrency,
    targetCurrency,
    setSourceCurrencyCode,
    setTargetCurrencyCode,
  } = useStore(
    useShallow((state: IStore) => ({
      sourceCurrency: state.currencies.find(
        (item) => item.code === state.sourceCurrencyCode
      ) as TCurrency,
      targetCurrency: state.currencies.find(
        (item) => item.code === state.targetCurrencyCode
      ) as TCurrency,
      setSourceCurrencyCode: state.setSourceCurrencyCode,
      setTargetCurrencyCode: state.setTargetCurrencyCode,
    }))
  );

  const onCurrencyPress = (paramKey: "target" | "source") => {
    router.navigate({
      pathname: "/currencySelector",
      params: { paramKey },
    });
  };

  const onSwitchCurrencies = () => {
    setSourceCurrencyCode(targetCurrency.code);
    setTargetCurrencyCode(sourceCurrency.code);
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <View style={styles.currenciesContainer}>
        <CurrencySelector
          title="From:"
          currency={sourceCurrency}
          onPress={() => onCurrencyPress("source")}
        />

        <TouchableOpacity
          style={styles.switchButton}
          onPress={onSwitchCurrencies}
        >
          <SwitchIcon />
        </TouchableOpacity>

        <CurrencySelector
          title="To:"
          currency={targetCurrency}
          onPress={() => onCurrencyPress("target")}
        />
      </View>

      <Calculation
        sourceCurrency={sourceCurrency}
        targetCurrency={targetCurrency}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 0.9,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 20,
  },
  currenciesContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  switchButton: {
    alignSelf: "flex-end",
    marginHorizontal: 16,
  },
});
