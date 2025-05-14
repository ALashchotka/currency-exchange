const MAX_AMOUNT_LENGTH = 10;

const formatNumber = (value: string | number) => {
  const v = value.toString();
  const m = v.match(/(.*)e-(\d)/);

  return m
    ? `0.${new Array(parseInt(m[2], 10)).join("0")}${m[1].replace(".", "")}`
    : v;
};

export function validateAmount(
  amount: string | number,
  maxDecimalLength: number | null = null
): string {
  const validatedAmount = formatNumber(amount).replace(/[^\d,.]/g, "");

  const hasDecimalSeparator = /[.,]/.test(validatedAmount);

  const [integerPart, decimalPart = ""] = validatedAmount.split(/[.,]/);

  const truncatedDecimalPart =
    maxDecimalLength !== null && decimalPart
      ? decimalPart.slice(0, maxDecimalLength)
      : decimalPart;

  const truncatedIntegerPart = integerPart.slice(
    0,
    MAX_AMOUNT_LENGTH - (maxDecimalLength || 0)
  );

  const parsedInteger = parseInt(truncatedIntegerPart, 10);

  if (isNaN(parsedInteger)) {
    return "";
  }

  const result =
    hasDecimalSeparator || truncatedDecimalPart
      ? `${parsedInteger},${truncatedDecimalPart}`
      : `${parsedInteger}`;

  return result.trim();
}
