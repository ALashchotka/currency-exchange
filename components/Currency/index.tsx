import { Image, StyleSheet, Text, TouchableOpacity } from "react-native";

import Radio from "@/assets/svg/radio.svg";
import RadioChecked from "@/assets/svg/radio_checked.svg";

import { Colors } from "@/constants/Colors";
import { TCurrency } from "@/constants/types";

export function Currency({
  currency,
  isSelected,
  onPress,
}: {
  currency: TCurrency;
  isSelected: boolean;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      style={[styles.container, isSelected && styles.containerSelected]}
      onPress={onPress}
    >
      <Image style={styles.flag} source={{ uri: currency.flagSrc }} />

      <Text style={styles.title} numberOfLines={1}>
        {currency.code} - {currency.name}
      </Text>

      {isSelected && <RadioChecked />}
      {!isSelected && <Radio />}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.buttonSecondary,
    padding: 16,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  containerSelected: {
    backgroundColor: Colors.button,
  },

  flag: {
    height: 20,
    width: 30,
    borderColor: Colors.text,
    borderRadius: 4,
    borderWidth: 1,
  },

  title: {
    flex: 1,
    color: Colors.text,
    fontSize: 16,
    marginHorizontal: 8,
    marginRight: "auto",
  },
});
