import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, interval } from 'rxjs';

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
    this.firstObsSubscription = interval(1000).subscribe(count => {
      console.log(count);
    })
  }

}
