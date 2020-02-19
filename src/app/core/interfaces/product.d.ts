import { IFile } from "./file";
import { IComment } from "./comments";

export interface IProduct {
    id: number,
    name: string,
    subCategoryId: number,
    description: string,
    amount: number,
    discount: number,
    weight: number,
    price: number,
    available: boolean,
    isPromotion: boolean,
    characteristicsValues: any[],
    previewImage: IFile;
    images: IFile[];
    createdAt: string,
    updatedAt: string,
    comments: IComment[]
}