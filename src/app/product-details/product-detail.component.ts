import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductResolved, Product } from '../products/product';
import { ProductService } from '../products/product.service';
import { map, tap } from 'rxjs/operators';


@Component({
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  pageTitle = 'Product Detail';
  product: any;
  errorMessage: string;

  constructor(private route: ActivatedRoute, private router: Router, private ps: ProductService) { }

  ngOnInit(): void {
    this.route.data.subscribe(data=>{
      const resolvedData: ProductResolved =
      this.route.snapshot.data.resolvedData;
      const res = this.route.snapshot.data.resolvedData.product;
      this.onProductRetrieved(res);
    })  
  }

  onProductRetrieved(product: any): void {

    this.product = (product);
    if (this.product) {
      this.pageTitle = `Product Detail: ${this.product.productName}`;
    } else {
      this.pageTitle = 'No product found';
    }
  }
  // onBack(): void {
  //   this.route.navigate(['/products']);
  // }
}



