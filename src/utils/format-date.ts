export const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  const formatter = new Intl.DateTimeFormat("id-ID", {
    dateStyle: "medium",
  });
  return formatter.format(date);
};

export const formatDate1 = (dateStr: string) => {
  const date = new Date(dateStr);
  // Example: Full date style for US English
  const formatter1 = new Intl.DateTimeFormat("en-US", { dateStyle: "full" });
  // Example: Custom format with specific components
  const formatter2 = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false, // Use 24-hour format
  });
  return formatter1.format(date);
};
