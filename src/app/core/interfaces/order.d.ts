import { IProduct } from "./product";

export interface IOrder {
    product: IProduct,
    productId: number,
    userId?: number,
    amount: number
}