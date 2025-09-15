import React, {
  FC,
  ChangeEvent,
  Dispatch,
  InputHTMLAttributes,
  SetStateAction,
} from "react";

type KeyOfText<T> = {
  [K in keyof T]: T[K] extends string | number ? K : never;
}[keyof T];

interface InputTextProps<T> extends InputHTMLAttributes<HTMLInputElement> {
  title: string;
  htmlId: KeyOfText<T>;
  className?: string;
  req: T;
  setReq: Dispatch<SetStateAction<T>>;
}

const InputText = <T,>(props: InputTextProps<T>) => {
  const { title, htmlId, className, req, setReq, ...rest } = props;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setReq((prev) => ({
      ...prev,
      [id]: value as T[typeof htmlId],
    }));
  };

  return (
    <div className="mb-2">
      <label htmlFor={String(htmlId)} className="block text-xl mb-2">
        {title}
      </label>
      <input
        type="text"
        id={String(htmlId)}
        className={`w-full p-2 rounded text-sm border ps-3 ${className ?? ""}`}
        onChange={handleChange}
        value={req[htmlId] as string | number | undefined}
        {...rest}
      />
    </div>
  );
};

export default InputText;
