const formatCurrency = (num: string | number): string => {
  if (num === null || num === undefined || num === "") return "";

  const str = num.toString().replace(/[^0-9,]/g, "");
  const split = str.split(",");

  const integerPart = split[0].replace(/^0+(?!$)/, "");
  const remain = integerPart.length % 3;

  const head = integerPart.substring(0, remain);
  const thousands = integerPart.substring(remain).match(/\d{3}/gi);

  const body = thousands ? (remain ? "." : "") + thousands.join(".") : "";
  const decimal = split[1] !== undefined ? `,${split[1]}` : "";

  const currency = head + body + decimal;

  return currency ? `$ ${currency}` : "";
};

const formatCurrency1 = (input: number) => {
  const formattedValue = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(input);
  return formattedValue;
};
const formatCurrency2 = (input: number) => {
  if (input === 0) {
    return formatCurrency1(0);
  }
  if (input < 0) {
    return `- ${formatCurrency1(Math.abs(input))}`;
  }
  return `+ ${formatCurrency1(input)}`;
};

const formatCurrency3 = (input: number) => {
  const formatted = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2, // Ensure at least two decimal places
    maximumFractionDigits: 2, // Ensure no more than two decimal places
  }).format(input);
  return formatted;
};
const unFormatCurrency = (val: string) => {
  if (!val) return 0;
  const clean = val.replace(/[^0-9,]/g, "").replace(",", ".");
  return Number(clean);
};
export {
  formatCurrency,
  formatCurrency1,
  formatCurrency2,
  formatCurrency3,
  unFormatCurrency,
};
