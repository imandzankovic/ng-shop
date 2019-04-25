import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { Product } from './product';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private path = 'http://localhost:3000';
  id: any;
  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.path + '/products').pipe(
      tap(data => console.log('All' + JSON.stringify(data))),
      catchError(this.handleError)
    );
  }
  getProduct(id: number): Observable<Product | undefined> {
      return this.http.get<Product[]>(this.path + '/products').pipe(
          map((products: Product[]) => products.find(p => p.id === id))
      );
  }

  // getProducts(): Observable<Product[]> {
  //     return this.http.get<Product[]>(this.path + '/products')
  //       .pipe(
  //         tap(data => console.log(JSON.stringify(data))),
  //         catchError(this.handleError)
  //       );
  //   }

  // getProduct(id: number): Observable<Product> {
  //   // if (id === 0) {
  //   //   // return as observable
  //   //   return of(this.initializeProduct());
  //   // }
  //   const url = `${this.path + '/product'}/${id}`;
  //   return this.http.get<Product>(url)
  //     .pipe(
  //       tap(data => console.log('getProduct: ' + JSON.stringify(data))),
  //       catchError(this.handleError)
  //     );
  // }
  createProduct(product: Product): Observable<Product> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    var count=10;
    count++;
    product.id=2;
    product.id +=count;
    count++;
    return this.http.post<Product>(this.path + '/products', product, { headers: headers })
      .pipe(
        tap(data => console.log('createProduct: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  };

  deleteProduct(id: number): Observable<{}> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.path + '/product'}/${id}`;
    return this.http.delete<Product>(url, { headers: headers })
      .pipe(
        tap(data => console.log('deleteProduct: ' + id)),
        catchError(this.handleError)
      );
  }

  updateProduct(product: Product): Observable<Product> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/text' });
    const url = `${this.path + '/products'}/${product.id}`;
    return this.http.put<Product>(url, product, { headers: headers })
      .pipe(
        tap(() => console.log('updateProduct: ' + product.id)),
        // Return the product on an update
        map(() => product),
        catchError(this.handleError)
      );
  }

  private handleError(err: HttpErrorResponse) {

    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occured : ${err.error.message}`;
    } else {
      errorMessage = `Server returned code: ${err.status}, message is: ${err.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }

  private initializeProduct(): Product {
    // Return an initialized object
    return {
      id: 0,
      productName: null,
      productCode: null,
      tags: [''],
      releaseDate: null,
      price: null,
      description: null,
      starRating: null,
      imageUrl: null
    };
  }

}

