export interface IValue {
    id: number,
    name: string,
    type: string,
    productId: number,
    characteristicSettingId: number,
    stringValue: string,
    booleanValue: boolean,
    integerValue: number,
    floatValue: number,
    dateValue: Date,
    enumValue: string,
    createdAt: string,
    updatedAt: string
}
