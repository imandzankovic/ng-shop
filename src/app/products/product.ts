export class Product {

    constructor(id, productName, productCode) {
        this.id = id;
        this.productName = productName;
        this.productCode = productCode;
    }


    // _id: number;
    id: number;
    productName: string;
    productCode: string;
    category: string;
    tags?: string[];
    releaseDate: string;
    description: string;
    price: number;
    starRating: number;
    imageUrl: string;
}

export interface ProductResolved {
    product: Product;
    error?: any;
}
