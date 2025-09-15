"use client";
import { Product } from "@/src/interface/Product";
import productAPI from "@/src/services/product";
import { formatCurrency3 } from "@/src/utils/format-currency";
import React, { useEffect, useState } from "react";
import ProductDetailModal from "@/src/features/product/product-detail-modal";
import ProductUpdateModal from "@/src/features/product/product-update-modal";
import ProductDeleteModal from "@/src/features/product/product-delete-modal";

const ProductTable = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const getProductAPI = async () => {
    setLoading(true);
    try {
      const res = await productAPI.getProduct();
      setProducts(res);
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getProductAPI();
  }, []);
  return (
    <table className="table table-zebra">
      {/* head */}
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Price</th>
          <th className="text-center">Actions</th>
        </tr>
      </thead>
      <tbody>
        {loading && (
          <tr>
            <td colSpan={4} className="italic text-center text-lg">
              loading....
            </td>
          </tr>
        )}
        {!loading && (
          <>
            {products.length === 0 && (
              <tr>
                <td colSpan={4} className="italic text-center text-lg">
                  product is empty ...
                </td>
              </tr>
            )}
            {products.length > 0 &&
              products.map((product, i) => (
                <tr key={product.id}>
                  <th>{i + 1}</th>
                  <td className="capitalize">{product.name}</td>
                  <td>{formatCurrency3(product.price)}</td>
                  {/* <img src={product.img || "/josse.png"} alt="" /> */}
                  <td className="flex justify-between gap-3">
                    <ProductDetailModal
                      productName={product.name}
                      productId={product.id}
                    />
                    <ProductUpdateModal
                      productName={product.name}
                      productId={product.id}
                    />
                    <ProductDeleteModal id={product.id} name={product.name} />
                  </td>
                </tr>
              ))}
          </>
        )}
      </tbody>
    </table>
  );
};

export default ProductTable;
