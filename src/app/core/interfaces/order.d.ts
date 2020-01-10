import { IProduct } from "./product";

export interface IOrder {
    product: IProduct
    amount: number
}