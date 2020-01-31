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
    imgId: number,
    img: {
        id?: number,
        name?: string,
        url?: string
    },
    createdAt: string,
    updatedAt: string
}
