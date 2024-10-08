import {Component, OnInit} from '@angular/core';
import {ProductsType} from "../../../../types/products.type";
import {ProductsService} from "../../../shared/services/products.service";
import {tap} from "rxjs";

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit {
  public products: ProductsType[] = [];
  public loading: boolean = false;

  constructor(public productsService: ProductsService) { }

  ngOnInit() {
   // this.productsService.getProducts();
    this.loading = true;
    this.productsService.getProducts()
      .pipe(tap(() => {
        this.loading = false;
      }))
      .subscribe(result => {
        this.products = result;
      });

    // this.http.get<ProductsType[]>('https://testologia.ru/tea')
    //   // .pipe(
    //   //   tap(result => {
    //   //     this.products = result;
    //   //     console.log(result);
    //   //   }),
    //   //   //   map((result) => (result.data)),
    //   // )
    //   .subscribe({
    //   next: (data) => {
    //     this.products = data;
    //     console.log(data);
    //     // return data;
    //   },
    //   error: (error) => {
    //     console.log(error);
    //     this.router.navigate(['/']);
    //   }
    // });
  }

}
