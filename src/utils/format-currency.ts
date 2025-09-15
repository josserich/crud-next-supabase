const formatCurrency = (num: string | number): string => {
  if (!num) return "";
  const str = num.toString().replace(/[^0-9,]/g, ""); // hapus karakter selain angka dan koma
  const split = str.split(",");
  let integerPart = split[0].replace(/^0+(?!$)/, "");
  const remain = integerPart.length % 3;
  let currency = integerPart.substring(0, remain);
  const thousands = integerPart.substring(remain).match(/\d{3}/gi);
  if (thousands) {
    const separator = remain ? "." : "";
    currency += separator + thousands.join(".");
  }
  currency = split[1] !== undefined ? currency + "," + split[1] : currency;
  return currency ? "$ " + currency : "";
};
const formatCurrency1 = (input: number) => {
  const formattedValue = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(input);
  return formattedValue;
};
const formatCurrency2 = (input: number) => {
  let priceTxt = ``;
  if (input === 0) {
    priceTxt = `${formatCurrency1(input)}`;
  }
  if (input < 0) {
    priceTxt = `- ${formatCurrency1(Math.abs(input))}`;
  }
  if (input > 0) {
    priceTxt = `+ ${formatCurrency1(input)}`;
  }
  return priceTxt;
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
