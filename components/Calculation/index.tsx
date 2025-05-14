import { useMemo, useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import { Colors } from "@/constants/Colors";
import { TCurrency } from "@/constants/types";
import { useRates } from "@/hooks/useRates";
import { validateAmount } from "@/utils/validation";

export function Calculation({
  sourceCurrency,
  targetCurrency,
}: {
  sourceCurrency: TCurrency;
  targetCurrency: TCurrency;
}) {
  const rates = useRates();

  const [value, setValue] = useState("");

  const result = useMemo(
    () =>
      rates?.[targetCurrency.code]
        ? validateAmount(
            parseFloat(value.split(",").join(".")) * rates[targetCurrency.code],
            targetCurrency.decimalDigits
          )
        : 0,
    [rates, targetCurrency, value]
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Amount:</Text>

      <TextInput
        style={styles.input}
        placeholder="0"
        placeholderTextColor={Colors.text + "80"}
        onChangeText={(text) =>
          setValue(validateAmount(text, sourceCurrency.decimalDigits))
        }
        value={value}
        keyboardType="numeric"
        underlineColorAndroid="transparent"
      />

      <View style={styles.resultContainer}>
        <Text style={styles.resultSource}>
          {value || 0}
          {sourceCurrency.symbolNative}
          {` =`}
        </Text>

        {!!rates && (
          <Text style={styles.resultTarget}>
            {result || 0}
            {" " + targetCurrency.symbolNative}
          </Text>
        )}

        {!rates && (
          <ActivityIndicator
            style={styles.loadingIndicator}
            color={Colors.text}
            size="large"
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginTop: 16,
  },
  title: {
    color: Colors.text,
    fontSize: 16,
    marginBottom: 8,
  },

  input: {
    backgroundColor: Colors.backgroundSecondary,
    borderColor: Colors.text,
    borderRadius: 8,
    borderWidth: 1,
    fontSize: 16,
    color: Colors.text,
    paddingHorizontal: 16,
    paddingVertical: 12,
    width: "100%",
  },

  resultContainer: {
    marginTop: 24,
  },
  resultSource: {
    fontSize: 16,
    color: Colors.text,
  },
  resultTarget: {
    marginTop: 4,
    fontSize: 42,
    height: 50,
    color: Colors.text,
  },

  loadingIndicator: {
    alignSelf: "flex-start",
    marginTop: 4,
    height: 50,
  },
});
