import { formatCurrency, unFormatCurrency } from "@/src/utils/format-currency";
import React, {
  ChangeEvent,
  Dispatch,
  FC,
  InputHTMLAttributes,
  SetStateAction,
  useEffect,
  useState,
} from "react";

interface InputBalanceProps extends InputHTMLAttributes<HTMLInputElement> {
  title: string;
  htmlId: string;
  className?: string;
  req: any;
  setReq: Dispatch<SetStateAction<any>>;
}

const InputBalance: FC<InputBalanceProps> = (props) => {
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
      <label htmlFor={htmlId} className="text-2xl block mb-2">
        {title}
      </label>
      <input
        id={htmlId}
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
