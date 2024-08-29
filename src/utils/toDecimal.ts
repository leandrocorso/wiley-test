export const toDecimal = (str: string, decSeparator: number = 2): string => {
  const numberStr = parseInt(str.replace(/[\D]/g, ""))
    .toString()
    .padStart(decSeparator + 1, "0");

  if (isNaN(parseFloat(numberStr))) return "";

  const { length } = numberStr;
  const separator = length - decSeparator;

  if (length > 2) {
    return `${numberStr.slice(0, separator)}.${numberStr.slice(separator)}`;
  } else {
    return numberStr;
  }
};
