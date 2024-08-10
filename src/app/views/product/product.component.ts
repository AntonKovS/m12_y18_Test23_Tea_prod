import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ProductsService} from "../../shared/services/products.service";
import {ProductsType} from "../../../types/products.type";
import {tap} from "rxjs";


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  public id: number = 0;
  public product:  ProductsType = {} as ProductsType;
  public loading: boolean = false;

  constructor(public productsService: ProductsService, private activatedRoute: ActivatedRoute) {
    // this.productsService.getProducts();
    this.activatedRoute.params.subscribe((params) => {
      if (params['id']) {
        this.id = Number(params['id'])-1;
        this.loading = true;
        this.productsService.getProducts()
          .pipe(tap(() => {
            this.loading = false;
          }))
          .subscribe(result => {
            this.product = result[this.id];
          });
        // this.product = this.productsService.products;

        //   const prod: ProductsType | undefined = this.productsService.products
        //   .find((item: ProductsType) => Number(item.id) === params['id']);
        // if (prod) {
        //   this.product = prod;
        // }
      }
    });
  }

  ngOnInit(): void {
  }

}
