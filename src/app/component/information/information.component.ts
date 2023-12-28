import {Component, OnInit} from '@angular/core';
import {IProducts} from '../../../models/products';
import {Subscription} from 'rxjs';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.scss']
})
export class InformationComponent implements OnInit {

  product: IProducts;
  productSubscription: Subscription;

  constructor(private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.productSubscription = this.route.data.subscribe((data) => {
      this.product = data['data'];
    });
  }
}
