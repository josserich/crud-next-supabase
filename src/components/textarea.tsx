import React, {
  ChangeEvent,
  Dispatch,
  FC,
  SetStateAction,
  TextareaHTMLAttributes,
} from "react";

// Generic TextArea
interface TextAreaProps<T> extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  title: string;
  htmlId: keyof T & string; // hanya bisa id yang ada di T
  className?: string;
  req: T;
  setReq: Dispatch<SetStateAction<T>>;
}

const TextArea = <T,>(props: TextAreaProps<T>) => {
  const { title, htmlId, className, req, setReq, ...rest } = props;

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setReq((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  return (
    <div className="mb-2">
      <label htmlFor={htmlId} className="block text-xl mb-2">
        {title}
      </label>
      <textarea
        id={htmlId}
        className={`w-full p-2 rounded text-sm border ps-3 ${className}`}
        value={req[htmlId] as unknown as string}
        onChange={handleChange}
        rows={7}
        {...rest}
      />
    </div>
  );
};

export default TextArea;
