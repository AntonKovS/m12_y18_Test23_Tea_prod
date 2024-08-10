import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
// import {tap} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {OrderProduct} from "../../../types/order-product";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  signInForm = this.fb.group({
    product: [''],
    // name: [''],
    name: ['', [Validators.required, Validators.pattern(/^[a-zA-Zа-яёА-ЯЁ]*$/)]],
    // last_name: [''],
    last_name: ['', [Validators.required, Validators.pattern(/^[a-zA-Zа-яёА-ЯЁ]*$/)]],
    // phone: [''],
    phone: ['', [Validators.required, Validators.pattern(/^(\+)?\d{11}$/)]],
    // country: [''],
    country: ['', Validators.required],
    // zip: [''],
    zip: ['', [Validators.required, Validators.pattern(/^\d{6,}$/)]],
    // address: [''],
    address: ['', [Validators.required, Validators.pattern(/^[a-zA-Zа-яёА-ЯЁ\d\s-/]*$/)]],
    comment: ['']
  });

  get name() {
    return this.signInForm.get('name');
  }
  get last_name() {
    return this.signInForm.get('last_name');
  }
  get phone() {
    return this.signInForm.get('phone');
  }
  get address() {
    return this.signInForm.get('address');
  }
  get zip() {
    return this.signInForm.get('zip');
  }

  // public buttonDisabled: boolean = false;
  public errorButton: boolean = false;
  public successfulOrder: boolean = false;

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private http: HttpClient, private fb: FormBuilder) {
    this.activatedRoute.params.subscribe((params) => {
      if (params['title']) {
        this.signInForm.patchValue({
          product: params['title'],
        });
      }
    });
  }

  ngOnInit(): void {
  }

  signIn() {
    // console.log(this.signInForm.value);  //value потому что не конкретное значение, а используется экземпляр класса.
    if (this.signInForm.value) {
      let orderInfo: OrderProduct = {
        product: this.signInForm.value.product,
        name: this.signInForm.value.name,
        last_name: this.signInForm.value.last_name,
        phone: this.signInForm.value.phone,
        country: this.signInForm.value.country,
        zip: this.signInForm.value.zip,
        address: this.signInForm.value.address,
        comment: this.signInForm.value.comment,
      }
      // this.buttonDisabled = true;
      this.http.post<{ success: boolean, message?: string }>('https://testologia.ru/order-tea', orderInfo)
        // .pipe(tap(() => {
          // this.buttonDisabled = false;
        // }))
        .subscribe
        ({
          next: (data) => {
            console.log(data);
            if (data.success && Number(data.success) === 1) {
              this.successfulOrder = true;
            } else {
              this.errorButton = true;
              setTimeout(() => {
                this.errorButton = false;
              }, 3000);
              alert(data.message);
            }
          },
          error: (error) => {
            console.log(error.message);
            alert('Ошибка url запроса.');
            this.router.navigate(['/catalog']);
          }
        });
    }
  }

}
