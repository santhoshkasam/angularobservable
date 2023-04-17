import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  id: number;

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    /*Below setup, the subsrciption of changing route parameters.
    Here is params is an observable which we are subscribing
    Observable is stream of data when new data emitted our observable will know about it
    Prams is an observable. Its a stream of route parameters and that stream gives us a new route parameter
    whenever we goto a new page, whenever that parameter in the URL changes */
    this.route.params.subscribe((params: Params) => {
      this.id = +params.id;
    });
  }
}
