import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Observable, Subscription} from "rxjs";

declare var $: any;

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit, OnDestroy {
  popupShow: boolean = false;
  private observable: Observable<boolean>;
  private subscription: Subscription | null = null;

  constructor(private activatedRoute: ActivatedRoute) {
    this.observable = new Observable((observer) => {
      const timeout1 = setTimeout(() => {
        observer.next(true);
      }, 10000);
      const intervalComplete = setTimeout(() => {
        observer.complete();
      }, 11000);
      // const interval2 = setInterval(() => {
      //   observer.next(this.popupShow = !this.popupShow);
      // }, 500);
      return {
        unsubscribe() {
          clearTimeout(timeout1);
          clearTimeout(intervalComplete);
          // clearInterval(interval2);
        }
      }
    });
  }

  ngOnInit(): void {
    this.accordion();

    this.subscription = this.observable.subscribe({
        next: (param: boolean) => {
          this.popupShow = param;
        },
        error: (error: string) => {
          console.log('ERROR! ' + error);
        }
      }
    )
    // this.test();
  }

  accordion() {
    $(function () {
      $("#accordion").accordion({
        heightStyle: "content",
        // icons: false
      });
    });
  }

  test() {
    this.subscription = this.activatedRoute.queryParams.subscribe((params) => {
      setInterval(() => {
        this.popupShow = !this.popupShow;
        console.log(this.popupShow);
      }, 500);
    });
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

}
