import { getImageBase64, validateExt } from "@/src/utils/img";
import React, {
  ChangeEvent,
  Dispatch,
  InputHTMLAttributes,
  SetStateAction,
  useRef,
  useState,
} from "react";

// Ambil key dari T yang tipenya File | string | null
type KeyOfImage<T> = {
  [K in keyof T]: T[K] extends File | string | null | undefined ? K : never;
}[keyof T];

interface InputImgProps<T> extends InputHTMLAttributes<HTMLInputElement> {
  title: string;
  htmlId: KeyOfImage<T>;
  className?: string;
  req: T;
  setReq: Dispatch<SetStateAction<T>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
}

const InputImg = <T,>(props: InputImgProps<T>) => {
  const { req, setReq, title, htmlId, className, setLoading, ...rest } = props;
  const [blob, setBlob] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    setLoading(true);
    try {
      const { files } = e.target;
      if (!files) return;
      const file = files[0];
      const validated = validateExt(file);
      if (validated) {
        const imgBase64 = await getImageBase64(file);
        setBlob(imgBase64);
      }
      setReq((prev) => ({
        ...prev,
        [htmlId]: file as T[typeof htmlId], // simpan File ke state
      }));
    } finally {
      setLoading(false);
    }
  };

  const cancelImg = () => {
    setBlob("");
    setReq((prev) => ({
      ...prev,
      [htmlId]: null as T[typeof htmlId], // reset jadi null
    }));
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const src =
    blob || (typeof req[htmlId] === "string" ? (req[htmlId] as string) : "");

  return (
    <div className="mb-2">
      <label htmlFor={String(htmlId)} className="block text-xl mb-2">
        {title}
      </label>

      {/* preview img */}
      {src && (
        <div className="relative">
          <div
            className="bg-red-600 text-white h-[35px] w-[35px] rounded-full flex justify-center items-center absolute right-[-10px] top-[-10px] cursor-pointer"
            onClick={cancelImg}
          >
            <div className="text-xl">x</div>
          </div>
          <img
            src={src}
            alt="preview-img"
            className="w-full h-auto my-2"
            onLoad={() => setLoading(false)}
          />
        </div>
      )}

      <input
        type="file"
        ref={inputRef}
        className={`w-full p-2 rounded text-sm border ps-3 ${className ?? ""}`}
        id={String(htmlId)}
        onChange={handleChange}
        {...rest}
      />
    </div>
  );
};

export default InputImg;
