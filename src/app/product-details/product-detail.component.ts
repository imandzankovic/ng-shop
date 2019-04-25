import { Component, OnInit } from '@angular/core';
import { Product } from '../products/product';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../products/product.service';



@Component({

  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  pageTitle: string = 'Product Detail';
  product: Product | undefined;
 
  constructor(private route: ActivatedRoute,
              private router:Router,
              private productService:ProductService) { }

  ngOnInit() {
    let id= +this.route.snapshot.paramMap.get('id');
   if(id){
     this.getProduct(id);
   }
   
  }
  getProduct(id:number){
    this.productService.getProduct(id).subscribe(
      product=>this.product=product);  
  }
  onBack():void{
    this.router.navigate(['/products']);
  }

}
