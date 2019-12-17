export interface ISetting {
    id: number,
    name: string,
    type: string,
    description: string,
    options: string[],
    minOption: string[],
    maxOption: string[],
    createdAt: string,
    updatedAt: string
}
