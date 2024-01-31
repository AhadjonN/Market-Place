import {Component, OnInit} from '@angular/core';
import {IProducts} from '../../../models/products';
import {Subscription} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {ProductsService} from '../../../service/products.service';

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.scss']
})
export class InformationComponent implements OnInit {

  product: IProducts;
  productSubscription: Subscription;

  basket: IProducts[];
  basketSubscription: Subscription;

  constructor(private route: ActivatedRoute,
              public ProductService: ProductsService,) {

  }

  ngOnInit() {
    this.productSubscription = this.route.data.subscribe((data) => {
      this.product = data['data'];
    });

    this.basketSubscription = this.ProductService.getProductFromBasket().subscribe((data) => {
      this.basket = data;
    });
  }

  addToBasket(product: IProducts) {
    product.quantity = 1;
    let findItem;
    if (this.basket.length > 0) {
      findItem = this.basket.find((item) => item.id === product.id
      );

      if (findItem) this.updateToBasket(findItem);
      else this.postToBasket(product);
    } else this.postToBasket(product);
  }

  postToBasket(product: IProducts) {
    this.ProductService.postProductBasket(product).subscribe((data) =>
      this.basket.push(data)
    );
  }

  updateToBasket(product: IProducts) {
    product.quantity += 1;
    this.ProductService.updateProductToBasket(product).subscribe((data) => {
    });
  }
}
