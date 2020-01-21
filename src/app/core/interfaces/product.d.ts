import { IFile } from "./file";

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
    updatedAt: string
}