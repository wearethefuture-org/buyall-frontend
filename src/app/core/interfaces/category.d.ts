import { ISubCategory } from "./subCategory";

export interface ICategory {
    id: number,
    name: string,
    description: string
    subCategories: ISubCategory[],
    createdAt: string,
    updatedAt: string
}
