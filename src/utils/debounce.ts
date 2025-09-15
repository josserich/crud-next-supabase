// debounce dengan Promise / async
const debounce = <T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
) => {
  let timeout: NodeJS.Timeout;

  return (...args: Parameters<T>): Promise<Awaited<ReturnType<T>>> => {
    return new Promise((resolve) => {
      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(async () => {
        const result = (await func(...args)) as Awaited<ReturnType<T>>;
        resolve(result);
      }, wait);
    });
  };
};

// const fetchUser = async (id: number) => ({ id, name: "Josse" });
// const debouncedFetch = debounce(fetchUser, 300);

// debouncedFetch(1).then((res) => console.log(res)); // { id: 1, name: "Josse" }
