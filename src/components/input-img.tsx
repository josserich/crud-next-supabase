import { getImageBase64, validateExt } from "@/src/utils/img";
import React, {
  ChangeEvent,
  Dispatch,
  FC,
  InputHTMLAttributes,
  SetStateAction,
  useRef,
  useState,
} from "react";

interface InputImgProps extends InputHTMLAttributes<HTMLInputElement> {
  title: string;
  htmlId: string;
  className?: string;
  req: any;
  setReq: Dispatch<SetStateAction<any>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
}

const InputImg: FC<InputImgProps> = (props) => {
  const { req, setReq, title, htmlId, className, setLoading, ...rest } = props;
  const [blob, setBlob] = useState<string>("");
  // const [imgLoaded, setImgLoaded] = useState<boolean>(false);
  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    setLoading(true);
    try {
      const { id, files } = e.target;
      if (!files) return;
      const validated = validateExt(files[0]);
      if (validated) {
        const imgBase64 = await getImageBase64(files[0]);
        setBlob(imgBase64);
      }
      setReq(() => ({
        ...req,
        [id]: files[0],
      }));
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };
  const inputRef = useRef<HTMLInputElement>(null);
  const cancelImg = () => {
    setBlob("");
    req.removeImg = true;
    setReq(() => ({
      ...req,
      [htmlId]: "",
    }));
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };
  const src = blob || (req[htmlId] ? req[htmlId] : "");
  return (
    <div className="mb-2">
      <label htmlFor={htmlId} className="block text-xl mb-2">
        {title}
      </label>
      {/* created */}
      {src && (
        <div className="relative">
          {/* btn cancel */}
          <div
            className="bg-red-600 text-white h-[35px] w-[35px] rounded-full flex justify-center items-center absolute right-[-10px] top-[-10px] cursor-pointer"
            onClick={cancelImg}
          >
            <div className="text-xl">x</div>
          </div>
          {/* placeholder skeleton */}
          {/* {!imgLoaded && (
            <div className="animate-pulse bg-gray-200 w-full h-48 rounded my-2" />
          )} */}
          {/* img */}
          <img
            src={src}
            alt="preview-img"
            className={`w-full h-auto my-2`}
            onLoad={() => {
              // setImgLoaded(true);
              setLoading(false);
            }}
          />
        </div>
      )}
      <input
        type="file"
        ref={inputRef}
        className={`w-full p-2 rounded text-sm border ps-3 ${className}`}
        id={htmlId}
        onChange={handleChange}
        {...rest}
      />
    </div>
  );
};

export default InputImg;
