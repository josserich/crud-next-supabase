import { ProductCreate, ProductUpdate } from "@/src/interface/Product";
import apiInstance from "./api";
import authAPI from "./auth";

const getProduct = async () => {
  const product = await apiInstance.get("/product", {
    headers: { "Content-Type": "application/json" },
  });
  return product.data;
};
const getProductId = async (id: string) => {
  const product = await apiInstance.get(`/product/${id}`, {
    headers: { "Content-Type": "application/json" },
  });
  return product.data;
};
const createProduct = async (req: ProductCreate) => {
  const { name, price, img, desc } = req;
  const formData = new FormData();
  formData.append("name", name);
  formData.append("price", String(price));
  if (img instanceof File) {
    formData.append("img", img);
  }
  formData.append("desc", desc);
  const authorization = await authAPI.getAuthorization();
  const created = await apiInstance.post("/product", formData, {
    headers: {
      Authorization: `Bearer ${authorization}`,
      "Content-Type": "multipart/form-data",
    },
  });
  return created;
};
const updateProduct = async (req: ProductUpdate) => {
  const { id, name, price, img, desc, removeImg } = req;
  // 1. upload with new image
  const formData = new FormData();
  formData.append("name", name);
  formData.append("price", String(price));
  if (img instanceof File) {
    formData.append("img", img);
  }
  formData.append("desc", desc);
  formData.append("removeImg", String(removeImg));
  const authorization = await authAPI.getAuthorization();
  const updated = await apiInstance.patch(`/product/${id}`, formData, {
    headers: {
      Authorization: `Bearer ${authorization}`,
      "Content-Type": "multipart/form-data",
    },
  });
  return updated;
};
const deleteProduct = async (id: string) => {
  const authorization = await authAPI.getAuthorization();
  const deleted = await apiInstance.delete(`/product/${id}`, {
    headers: {
      Authorization: `Bearer ${authorization}`,
      "Content-Type": "application/json",
    },
  });
  return deleted;
};

const productAPI = {
  createProduct,
  getProduct,
  getProductId,
  updateProduct,
  deleteProduct,
};
export default productAPI;
