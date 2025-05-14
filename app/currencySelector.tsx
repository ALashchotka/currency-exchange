import { FlashList } from "@shopify/flash-list";
import { router, useLocalSearchParams } from "expo-router";
import { useMemo, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useShallow } from "zustand/react/shallow";

import ArrowLeft from "@/assets/svg/arrow_left.svg";
import SearchIcon from "@/assets/svg/search.svg";

import { Currency } from "@/components";
import { Colors } from "@/constants/Colors";
import { TCurrency } from "@/constants/types";
import { IStore, useStore } from "@/store";

export default function CurrencySelectorScreen() {
  const insets = useSafeAreaInsets();

  const {
    currencies,
    sourceCurrencyCode,
    targetCurrencyCode,
    setSourceCurrencyCode,
    setTargetCurrencyCode,
  } = useStore(
    useShallow((state: IStore) => ({
      currencies: state.currencies,
      sourceCurrencyCode: state.sourceCurrencyCode,
      targetCurrencyCode: state.targetCurrencyCode,
      setSourceCurrencyCode: state.setSourceCurrencyCode,
      setTargetCurrencyCode: state.setTargetCurrencyCode,
    }))
  );

  const { paramKey } = useLocalSearchParams();

  const currencyCode = useMemo(
    () => (paramKey === "target" ? targetCurrencyCode : sourceCurrencyCode),
    [paramKey, sourceCurrencyCode, targetCurrencyCode]
  );

  const [searchValue, setSearchValue] = useState("");

  const filteredData = useMemo(
    () =>
      currencies.filter(
        (item) =>
          item.code.toLowerCase().includes(searchValue) ||
          item.name.toLowerCase().includes(searchValue)
      ),
    [currencies, searchValue]
  );

  const onCurrencyChange = (newCurrencyCode: TCurrency["code"]) => {
    if (paramKey === "target") {
      setTargetCurrencyCode(newCurrencyCode);
    } else {
      setSourceCurrencyCode(newCurrencyCode);
    }

    router.back();
  };

  const renderItem = ({ item }: { item: TCurrency }) => (
    <Currency
      currency={item}
      onPress={() => onCurrencyChange(item.code)}
      isSelected={item.code === currencyCode}
    />
  );

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom }]}>
      <View style={[styles.header, { paddingTop: insets.top + 16 }]}>
        <TouchableOpacity
          hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
          onPress={router.back}
        >
          <ArrowLeft />
        </TouchableOpacity>
        <Text style={styles.title}>Currency Select</Text>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Search..."
          placeholderTextColor={Colors.text + "80"}
          onChangeText={setSearchValue}
          value={searchValue}
        />

        <SearchIcon style={styles.searchIcon} />
      </View>

      <View style={styles.itemsContainer}>
        <FlashList
          data={filteredData}
          renderItem={renderItem}
          estimatedItemSize={currencies.length}
          extraData={currencyCode}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  header: {
    flexDirection: "row",
    backgroundColor: Colors.backgroundSecondary,
    alignItems: "center",
    paddingBottom: 16,
    paddingHorizontal: 20,
  },

  title: {
    color: Colors.text,
    fontSize: 20,
    fontWeight: "700",
    marginLeft: 12,
  },

  inputContainer: {
    justifyContent: "center",
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 8,
  },
  input: {
    backgroundColor: Colors.backgroundSecondary,
    borderColor: Colors.text,
    borderRadius: 8,
    borderWidth: 1,
    fontSize: 16,
    color: Colors.text,
    paddingRight: 16,
    paddingVertical: 12,
    paddingLeft: 42,
  },
  searchIcon: {
    position: "absolute",
    left: 16,
  },

  itemsContainer: {
    backgroundColor: Colors.buttonSecondary,
    flex: 1,
    marginHorizontal: 20,
    borderRadius: 8,
    marginVertical: 8,
  },
});
