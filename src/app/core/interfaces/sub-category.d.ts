import { IProduct } from "./product";

export interface ISubCategory {
    id: number,
    categoryId: number,
    name: string,
    descripton: string,
    products: IProduct[]
}
