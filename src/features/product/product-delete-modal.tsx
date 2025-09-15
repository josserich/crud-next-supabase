import { useAuth } from "@/src/contextts/context-auth";
import { APIErrorResponse, AxiosError } from "@/src/interface/api";
import productAPI from "@/src/services/product";
import React, { FC, FormEvent, MouseEvent, useRef, useState } from "react";
import { FaCheck, FaExclamationTriangle, FaTimes } from "react-icons/fa";
import { IoTrash } from "react-icons/io5";
import Swal from "sweetalert2";

interface ProductDeleteProps {
  id: string;
  name: string;
}
const ProductDeleteModal: FC<ProductDeleteProps> = (props) => {
  const { authorizeErr, setAuthorizeErr } = useAuth();
  const { id, name } = props;
  const modalRef = useRef<HTMLDialogElement>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const openModal = async (e: MouseEvent<HTMLButtonElement>) => {
    modalRef?.current?.showModal();
  };
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const deleted = await productAPI.deleteProduct(id);
      modalRef.current?.close();
      const text = deleted.data?.msg;
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
      console.error("Submit error:", error);
      throw err;
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <div className="tooltip tooltip-bottom" data-tip={`delete-${name}`}>
        <button
          className={`btn bg-red-700 text-white`}
          onClick={openModal}
          disabled={loading}
        >
          {loading ? (
            <span className="loading loading-spinner loading-md"></span>
          ) : (
            <IoTrash className="text-lg" />
          )}
        </button>
      </div>
      <dialog ref={modalRef} className="modal">
        <div className="modal-box p-0 flex flex-col h-auto">
          {/* Header */}
          <div className="bg-red-700 flex-shrink-0">
            <h1 className="text-white tracking-wider p-4 text-xl capitalize">
              {name}
            </h1>
          </div>
          {/* body & footer */}
          <form
            onSubmit={handleSubmit}
            className="flex flex-col flex-1 overflow-hidden"
          >
            {/* body */}
            <div className="p-5 flex-1 flex flex-col items-center justify-center">
              <FaExclamationTriangle className="text-red-600 text-8xl" />
              <p className="text-center text-xl my-2 capitalize">
                Are You Sure to Delete - {name} ?
              </p>
            </div>
            {/* Footer */}
            <div className="border-t border-t-slate-200 p-4 flex justify-end gap-3 flex-shrink-0">
              {authorizeErr ? (
                <div className="text-red-600 italic">{authorizeErr}</div>
              ) : (
                <>
                  <button
                    type="button"
                    className="bg-slate-600 text-white px-3 py-2 rounded cursor-pointer flex items-center gap-2"
                    onClick={() => modalRef.current?.close()}
                    disabled={loading}
                  >
                    <FaTimes className="text-xl" />
                    <div className="text-lg">No</div>
                  </button>
                  <button
                    type="submit"
                    className="bg-red-600 text-white px-3 py-2 rounded cursor-pointer flex items-center gap-2"
                    disabled={loading}
                  >
                    <FaCheck className="text-xl" />
                    <div className="text-lg">
                      {loading ? "loading...." : "Sure"}
                    </div>
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

export default ProductDeleteModal;
