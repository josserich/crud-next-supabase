import React, {
  FC,
  ChangeEvent,
  Dispatch,
  InputHTMLAttributes,
  SetStateAction,
} from "react";

interface InputTextProps extends InputHTMLAttributes<HTMLInputElement> {
  title: string;
  htmlId: string;
  className?: string;
  req: any;
  setReq: Dispatch<SetStateAction<any>>;
}
const InputText: FC<InputTextProps> = (props) => {
  const { title, htmlId, className, req, setReq, ...rest } = props;
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setReq(() => ({
      ...req,
      [id]: value,
    }));
  };
  return (
    <div className="mb-2">
      <label htmlFor={htmlId} className="block text-xl mb-2">
        {title}
      </label>
      <input
        type="text"
        id={htmlId}
        className={`w-full p-2 rounded text-sm border ps-3 ${className}`}
        onChange={handleChange}
        value={req[htmlId]}
        {...rest}
      />
    </div>
  );
};

export default InputText;
