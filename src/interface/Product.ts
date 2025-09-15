export interface Product {
  id: string;
  name: string;
  price: number;
  img: string;
  desc: string;
}
export interface ProductCreate {
  name: string;
  price: number;
  img?: File | null;
  desc: string;
}
export interface ProductUpdate {
  id: string;
  name: string;
  price: number;
  img?: File | null;
  desc: string;
  removeImg: boolean;
}
