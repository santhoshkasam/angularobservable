import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, interval, Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  //To access the observable so that we can destroy them in OnDestroy method
  firstObsSubscription: Subscription
  constructor() { }
  ngOnDestroy(): void {
    this.firstObsSubscription.unsubscribe();
  }

  ngOnInit() {
    //Every sec the event will be emitted
    // this.firstObsSubscription = interval(1000).subscribe(count => {
    //   console.log(count);
    // })
    const customIntervalObservable = Observable.create(observer => {
      let count = 0;
      setInterval(() => {
        //emitting new data
        observer.next(count);
        if (count == 2) {
          //When the error occurs the observer doesnt complete
          observer.complete();
        }
        if (count > 3) {
          observer.error(new Error('count is greater than 3'));
        }
        count++;
      }, 1000)
    });

    //We are modifying the data that we get from observable using map operator.
    // customIntervalObservable.pipe(map((data: number) => {
    //   return 'Round: ' + (data + 1);
    // }));

    // We can transform data that is Pipe by applying operators in the below code it is 
    // first filter the data means when number >0 then only goto next operator and subscribe
    // second oprator map to apply some text as Round to that data
    // after transforming or applying operators on data we are subscribing.
    this.firstObsSubscription = customIntervalObservable.pipe(filter((data:number) => {
      return data > 0;
    }), map((data: number) => {
      return 'Round: ' + (data + 1);
    })).subscribe(data => {
      console.log(data);
    }, error => {
      console.log(error);
      alert(error);
    }, () => {
      //when the error occurs observer cancels but doesnt complete
      console.log('completed');
    });
  }

}
