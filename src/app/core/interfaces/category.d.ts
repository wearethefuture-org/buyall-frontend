import { ISubCategory } from "./sub-category";

export interface ICategory {
    id: number,
    name: string,
    description: string
    subCategories: ISubCategory[],
    createdAt: string,
    updatedAt: string
}
