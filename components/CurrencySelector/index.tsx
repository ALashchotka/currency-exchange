import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import ChevronDownIcon from "@/assets/svg/chevron_down.svg";
import { Colors } from "@/constants/Colors";
import { TCurrency } from "@/constants/types";

export function CurrencySelector({
  currency,
  title,
  onPress,
}: {
  currency: TCurrency;
  title: string;
  onPress: () => void;
}) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>

      <TouchableOpacity style={styles.buttonContainer} onPress={onPress}>
        <Image style={styles.flag} source={{ uri: currency.flagSrc }} />

        <Text style={styles.buttonText}>{currency.code}</Text>

        <ChevronDownIcon />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  title: {
    color: Colors.text,
    fontSize: 16,
    marginBottom: 8,
  },

  flag: {
    height: 20,
    width: 30,
    borderColor: Colors.text,
    borderRadius: 4,
    borderWidth: 1,
  },

  buttonContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.button,
  },
  buttonText: {
    color: Colors.text,
    fontSize: 16,
    marginLeft: 8,
    marginRight: 17.5,
  },
});
