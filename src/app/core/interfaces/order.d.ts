import { IProduct } from "./product";

export interface IOrder {
    id?: number,
    product: IProduct,
    productId: number,
    userId?: number,
    amount: number
}