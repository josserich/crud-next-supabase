"use client";
import React, { FormEvent, useRef, useState } from "react";
import { MdAddBox } from "react-icons/md";
import InputText from "@/src/components/input-text";
import InputBalance from "@/src/components/input-balance";
import InputImg from "@/src/components/input-img";
import TextArea from "@/src/components/textarea";
import productAPI from "@/src/services/product";
import Swal from "sweetalert2";
import { useAuth } from "@/src/contextts/context-auth";
import { ProductCreate } from "@/src/interface/Product";
import { APIErrorResponse, AxiosError } from "@/src/interface/api";

const ProductCreateModal = () => {
  const { authorizeErr, setAuthorizeErr } = useAuth();
  const [req, setReq] = useState<ProductCreate>({
    name: "",
    img: null,
    price: 0,
    desc: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [msgErr, setMsgErr] = useState<{ [key: string]: string }>({});
  const modalRef = useRef<HTMLDialogElement>(null);
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const created = await productAPI.createProduct(req);
      modalRef.current?.close();
      const text = created.data.msg;
      await Swal.fire({
        title: "Success !",
        text,
        icon: "success",
      });
      window.location.reload();
    } catch (err: unknown) {
      const error = err as AxiosError<APIErrorResponse>;
      const errors = error.response?.data;
      if (errors?.authorization) {
        setAuthorizeErr(errors.authorization);
      }
      if (errors?.errors) {
        setMsgErr(errors.errors);
      }
      console.error("Submit error:", error);
      throw err;
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <button
        className="btn bg-green-700 text-white flex items-center gap-3 tracking-wider mb-4"
        onClick={() => modalRef.current?.showModal()}
      >
        <MdAddBox className="text-2xl" /> Create Product
      </button>
      <dialog ref={modalRef} className="modal">
        <div className="modal-box p-0 flex flex-col h-[80vh]">
          {/* Header */}
          <div className="bg-green-700 flex-shrink-0">
            <h1 className="text-white tracking-wider p-4 text-xl">
              Create Product
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
                    className="bg-green-600 text-white px-3 py-2 rounded cursor-pointer"
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

export default ProductCreateModal;
