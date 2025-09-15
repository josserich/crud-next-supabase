// debounce dengan Promise / async
const debounce = <T extends (...args: any[]) => any>(func: T, wait: number) => {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    return new Promise<ReturnType<T>>((resolve) => {
      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(() => {
        const result = func(...args);
        resolve(result);
      }, wait);
    });
  };
};
// const debouncedSearch = debounce(fetchSearch, 500);
// const handleInputChange = async (e: ChangeEvent<HTMLInputElement>) => {
//   const result = await debouncedSearch(e.target.value);
//   console.log("Result:", result);
// };
