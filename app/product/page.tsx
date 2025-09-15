import ProductCreateModal from "@/src/features/product/product-create-modal";
import ProductTable from "@/src/features/product/product-table";
import Top from "@/src/navigation/top";
import React from "react";

const ProductPage = () => {
  return (
    <div className="bg-slate-200 flex min-h-screen">
      <div className="w-2xl border-slate-200 m-auto p-5 bg-slate-100 rounded shadow">
        <Top />
        <h1 className="text-2xl text-center">CRUD + AUTH</h1>
        <ProductCreateModal />
        <ProductTable />
      </div>
    </div>
  );
};

export default ProductPage;
