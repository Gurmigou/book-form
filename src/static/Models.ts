export type Book = {
    name: string,
    price: number
}

export enum DeliveryType {
    POST = "Поштою", COURIER = "Кур'єром"
}

export type Customer = {
    name: string,
    address: string
}

export type Order = {
    book: Book,
    numberOfBooks: number,
    price: number,
    deliveryType: DeliveryType,
    hasFestivePackage: boolean,
    customer: Customer
}