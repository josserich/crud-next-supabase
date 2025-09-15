"use client";
import { Product } from "@/src/interface/Product";
import productAPI from "@/src/services/product";
import { formatCurrency3 } from "@/src/utils/format-currency";
import React, { FC, MouseEvent, useEffect, useRef, useState } from "react";
import { IoEyeSharp } from "react-icons/io5";

interface ProductDetailProps {
  productId: string;
  productName: string;
}

const ProductDetailModal: FC<ProductDetailProps> = (props) => {
  const { productId, productName } = props;
  const modalRef = useRef<HTMLDialogElement>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [product, setProduct] = useState<Product>({
    id: "",
    name: "",
    price: 0,
    img: "",
    desc: "",
  });
  const openModal = async (e: MouseEvent<HTMLButtonElement>) => {
    setLoading(true);
    try {
      const res = await productAPI.getProductId(productId);
      setProduct(res);
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      setLoading(false);
      modalRef.current?.showModal();
    }
  };
  return (
    <div>
      {/* button & tooltip */}
      <div className="tooltip tooltip-bottom" data-tip={`see-${productName}`}>
        <button
          className={`btn bg-green-700 text-white`}
          onClick={openModal}
          disabled={loading}
        >
          {loading ? (
            <span className="loading loading-spinner loading-md"></span>
          ) : (
            <IoEyeSharp className="text-lg" />
          )}
        </button>
      </div>
      {/* dialog */}
      <dialog ref={modalRef} className="modal">
        <div className="modal-box p-0 flex flex-col h-[80vh]">
          {/* Header */}
          <div className="bg-green-700 flex-shrink-0">
            <h1 className="text-white tracking-wider p-4 text-xl capitalize">
              {product.name}
            </h1>
          </div>
          {/* body & footer */}
          <div className="flex flex-col flex-1 overflow-hidden">
            {/* all-inputs && */}
            <div className="p-5 flex-1 overflow-y-auto">
              {/* product-name */}
              <div className="mb-2">
                <div className="text-2xl mb-2">Product Name : </div>
                <div className="capitalize text-xl ms-2">{product.name}</div>
              </div>
              {/* product-price */}
              <div className="mb-2">
                <div className="text-2xl mb-2">Product Price : </div>
                <div className="capitalize text-lg ms-2">
                  {formatCurrency3(product.price)}
                </div>
              </div>
              {/* product img */}
              <div className="mb-2">
                <div className="text-2xl mb-2">Product Image : </div>
                {product.img && <img src={product.img || ""} alt="" />}
                {product.img === "" && (
                  <div className="capitalize text-xl ms-2">-</div>
                )}
              </div>
              {/* product desc */}
              <div className="mb-2">
                <div className="text-2xl mb-2">Product Description : </div>
                <div className="text-lg ms-2 italic">{product.desc || "-"}</div>
              </div>
            </div>
            {/* Footer */}
            <div className="border-t border-t-slate-200 p-4 flex justify-end gap-3 flex-shrink-0">
              <button
                className="bg-green-600 text-white px-3 py-2 rounded cursor-pointer"
                onClick={() => modalRef.current?.close()}
                disabled={loading}
              >
                {loading ? "loading...." : "Done"}
              </button>
            </div>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default ProductDetailModal;
