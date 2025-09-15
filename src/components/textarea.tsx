import React, {
  ChangeEvent,
  Dispatch,
  FC,
  InputHTMLAttributes,
  SetStateAction,
  TextareaHTMLAttributes,
} from "react";

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  title: string;
  htmlId: string;
  className?: string;
  req: any;
  setReq: Dispatch<SetStateAction<any>>;
}

const TextArea: FC<TextAreaProps> = (props) => {
  const { title, htmlId, className, req, setReq, ...rest } = props;
  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
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
      <textarea
        id={htmlId}
        placeholder="ex : further information"
        rows={5}
        className={`w-full p-2 rounded text-sm border ps-3 ${className}`}
        value={req[htmlId]}
        onChange={handleChange}
        {...rest}
      />
    </div>
  );
};

export default TextArea;
