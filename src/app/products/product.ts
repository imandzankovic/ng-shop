export interface Product {
    // _id: number;
    id: number;
    productName: string;
    productCode: string;
    tags?: string[];
    releaseDate: string;
    description: string;
    price: number;
    starRating: number;
    imageUrl: string;
}