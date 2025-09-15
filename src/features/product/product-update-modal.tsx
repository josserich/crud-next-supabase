"use client";
import InputBalance from "@/src/components/input-balance";
import InputImg from "@/src/components/input-img";
import InputText from "@/src/components/input-text";
import TextArea from "@/src/components/textarea";
import { useAuth } from "@/src/contextts/context-auth";
import { Product, ProductUpdate } from "@/src/interface/Product";
import productAPI from "@/src/services/product";
import React, {
  FormEvent,
  useEffect,
  useRef,
  useState,
  MouseEvent,
  FC,
} from "react";
import { FaPencilAlt } from "react-icons/fa";
import Swal from "sweetalert2";

interface ProductUpdateProps {
  productId: string;
  productName: string;
}

const ProductUpdateModal: FC<ProductUpdateProps> = (props) => {
  const { authorizeErr, setAuthorizeErr } = useAuth();
  const { productId, productName } = props;
  const [req, setReq] = useState<ProductUpdate>({
    id: "",
    name: "",
    price: 0,
    img: null,
    desc: "",
    removeImg: false,
  });
  const [msgErr, setMsgErr] = useState<{ [key: string]: string }>({});
  const modalRef = useRef<HTMLDialogElement>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const openModal = async (e: MouseEvent<HTMLButtonElement>) => {
    setLoading(true);
    try {
      const res = await productAPI.getProductId(productId);
      setReq(res);
    } catch (err: any) {
      console.log(err);
      throw err;
    } finally {
      setLoading(false);
      modalRef?.current?.showModal();
    }
  };
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const updated = await productAPI.updateProduct(req);
      modalRef.current?.close();
      const text = updated.data?.msg;
      await Swal.fire({
        title: "Success !",
        text,
        icon: "success",
      });
      window.location.reload();
    } catch (err: any) {
      const errors = err.response?.data;
      if (errors?.authorization) {
        const text = errors.authorization;
        setAuthorizeErr(text);
      }
      setMsgErr(errors?.errors);
      throw err;
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <div
        className="tooltip tooltip-bottom"
        data-tip={`update-${productName}`}
      >
        <button
          className={`btn bg-blue-700 text-white tracking-wider`}
          onClick={openModal}
          disabled={loading}
        >
          {loading ? (
            <span className="loading loading-spinner loading-md"></span>
          ) : (
            <FaPencilAlt className="text-lg" />
          )}
        </button>
      </div>
      <dialog ref={modalRef} className="modal">
        <div className="modal-box p-0 flex flex-col h-[80vh]">
          {/* Header */}
          <div className="bg-blue-700 flex-shrink-0">
            <h1 className="text-white tracking-wider p-4 text-xl capitalize">
              {productName}
            </h1>
          </div>
          {/* body & footer */}
          <form
            onSubmit={handleSubmit}
            encType="multipart/form-data"
            className="flex flex-col flex-1 overflow-hidden"
          >
            {/* all-inputs && */}
            <div className="p-5 flex-1 overflow-y-auto">
              {/* product name */}
              <InputText
                title="Product Name :"
                htmlId="name"
                req={req}
                setReq={setReq}
                placeholder="ex : Product name"
              />
              {msgErr?.name && (
                <div className="ps-3 my-1 text-red-400">* {msgErr?.name}</div>
              )}
              {/* product price */}
              <InputBalance
                title="Product Price :"
                htmlId="price"
                req={req}
                setReq={setReq}
                placeholder="ex : $ 10.000"
              />
              {msgErr?.price && (
                <div className="ps-3 my-1 text-red-400">* {msgErr?.price}</div>
              )}
              {/* product image */}
              <InputImg
                title="Product Image :"
                htmlId="img"
                // updated={true}
                req={req}
                setReq={setReq}
                setLoading={setLoading}
              />
              {msgErr?.image && (
                <div className="ps-3 my-1 text-red-400">* {msgErr?.image}</div>
              )}
              {/* product description */}
              <TextArea
                title="Product Description"
                htmlId="desc"
                req={req}
                setReq={setReq}
              />
            </div>
            {/* Footer */}
            <div className="border-t border-t-slate-200 p-4 flex justify-end gap-3 flex-shrink-0">
              {authorizeErr ? (
                <div className="text-red-600 italic">{authorizeErr}</div>
              ) : (
                <>
                  <button
                    type="button"
                    className="bg-orange-600 text-white px-3 py-2 rounded cursor-pointer"
                    onClick={() => modalRef.current?.close()}
                    disabled={loading}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-700 text-white px-3 py-2 rounded cursor-pointer"
                    disabled={loading}
                  >
                    {loading ? "loading...." : "Submit"}
                  </button>
                </>
              )}
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default ProductUpdateModal;
