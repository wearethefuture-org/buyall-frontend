import { IUser} from "./user"

export interface IComment {
    id: number,
    message: string,
    userId: number,
    productId: number,
    createdAt: string,
    updatedAt: string,
    user: IUser,
}