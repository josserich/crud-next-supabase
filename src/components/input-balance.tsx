import { formatCurrency, unFormatCurrency } from "@/src/utils/format-currency";
import React, {
  ChangeEvent,
  Dispatch,
  InputHTMLAttributes,
  SetStateAction,
  useEffect,
  useState,
} from "react";

type KeyOfType<T, V> = {
  [K in keyof T]: T[K] extends V ? K : never;
}[keyof T];
interface InputBalanceProps<T> extends InputHTMLAttributes<HTMLInputElement> {
  title: string;
  htmlId: KeyOfType<T, number>;
  className?: string;
  req: T;
  setReq: Dispatch<SetStateAction<T>>;
}

const InputBalance = <T,>(props: InputBalanceProps<T>) => {
  const { title, htmlId, className, req, setReq, ...rest } = props;
  const [priceDisplay, setPriceDisplay] = useState<string>("");
  useEffect(() => {
    if (req[htmlId]) {
      setPriceDisplay(formatCurrency(String(req[htmlId])));
    }
  }, [req[htmlId]]);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    // to display
    const formatted = formatCurrency(value);
    setPriceDisplay(formatted);
    // to api
    const raw = unFormatCurrency(value);
    // update ke req
    setReq(() => ({
      ...req,
      [id]: raw,
    }));
  };
  return (
    <div className="mb-2">
      <label htmlFor={String(htmlId)} className="text-2xl block mb-2">
        {title}
      </label>
      <input
        id={String(htmlId)}
        type="text"
        className={`w-full p-2 rounded text-sm border ps-3 ${className}`}
        onChange={handleChange}
        value={priceDisplay}
        {...rest}
      />
    </div>
  );
};

export default InputBalance;
