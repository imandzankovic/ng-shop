import { Component, OnInit } from '@angular/core';
import { Product } from './product';
import { ProductService } from './product.service';



@Component({  
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']

})
export class ProductListComponent implements OnInit {


    pageTitle: string = 'Product List';
    imageWidth: number = 100;
    imageMargin: number = 2;
    showImage: boolean = false;

    _listFilter: string;
    errorMessage: any;


    get listFilter(): string {
        return this._listFilter;

    }
    set listFilter(value: string) {
        this._listFilter = value;
        this.filteredProducts = this.listFilter ? this.performFilter(this.listFilter) : this.products;
    }
    filteredProducts: Product[];
    products: Product[] = [];

    constructor(private productService: ProductService) {


    }
    performFilter(filterBy: string): Product[] {
        filterBy = filterBy.toLocaleLowerCase();
        return this.products.filter((product: Product) =>
            product.productName.toLocaleLowerCase().indexOf(filterBy) !== -1);
    }

    toogleImage(): void {
        this.showImage = !this.showImage;
    }

    ngOnInit(): void {
        this.productService.getProducts().subscribe(
            products => {
                this.products = products,
                    this.filteredProducts = this.products;
            },
            error => this.errorMessage = error as any

        );
       

    }
    onRatingClicked(message: string): void {
        this.pageTitle = 'Product List' + message;
    }

}
