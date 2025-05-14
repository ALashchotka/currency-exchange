import { useState } from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";

import currencies from "@/assets/json/currencies.json";
import SwitchIcon from "@/assets/svg/switch.svg";

import { Calculation, CurrencySelector } from "@/components";

export default function MainScreen() {
  const [sourceCurrency, setSourceCurrency] = useState(currencies[0]);
  const [targetCurrency, setTargetCurrency] = useState(currencies[1]);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <View style={styles.currenciesContainer}>
        <CurrencySelector title="From:" currency={sourceCurrency} />

        <TouchableOpacity style={styles.switchButton}>
          <SwitchIcon />
        </TouchableOpacity>

        <CurrencySelector title="To:" currency={targetCurrency} />
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
