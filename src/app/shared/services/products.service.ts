import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ProductsType} from "../../../types/products.type";
// import {tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  // public products: ProductsType[] = [];
  // public loading: boolean = false;

  constructor(private http: HttpClient) {}

  getProducts() {
    // this.loading = true;
    return this.http.get<ProductsType[]>('https://testologia.ru/tea')
      // .pipe(tap(() => {
      //   this.loading = false;
      // }))
      // .subscribe({
      //   next: (data) => {
      //     this.products = data;
      //     // console.log(data);
      //     return data;
      //   },
      //   error: (error) => {
      //     console.log(error.message);
      //     alert('Ошибка url запроса.');
      //     this.router.navigate(['/']);
      //   }
      // });
  }

  // getProducts(): Observable<ProductsType[]> {
  //   return this.http.get<ProductsType[]>('https://testologia.ru/tea')
  // }

}
