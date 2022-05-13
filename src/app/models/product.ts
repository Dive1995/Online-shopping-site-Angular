import { IProductStock } from "./productStock";

export interface IProduct{
    id: number;
    name: string;
    image: string;
    price: number;
    categoryId: number;
    description: string;
    productStock: IProductStock[];
}