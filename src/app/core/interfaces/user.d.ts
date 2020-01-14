import { IOrder } from "./order";

export interface IUser {
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    status: string,
    role: string,
    disabled: boolean,
    dateBirthday: string
    password: string,
    orders: IOrder[]
    createdAt: string,
    updatedAt: string
}
