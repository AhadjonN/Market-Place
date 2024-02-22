import {Component, OnInit} from '@angular/core';
import {IProducts} from '../../../models/products';
import {Subscription} from 'rxjs';
import {ProductsService} from '../../../service/products.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {

  constructor(public ProductService: ProductsService) {
  }

  basket: IProducts[];
  basketSubscription: Subscription;

  emptyBasket = true;

  ngOnInit(): void {
    this.basketSubscription = this.ProductService.getProductFromBasket().subscribe((data) => {
      this.basket = data;
      this.updateEmptyBasketFlag();
    });
  }

  minusItem(item: IProducts) {
    if (item.quantity === 1) {
      this.ProductService.deleteProductToBasket(item.id).subscribe(() => {
        let idx = this.basket.findIndex((data) => data.id === item.id);
        this.basket.splice(idx, 1);
        this.updateEmptyBasketFlag();
      });
    } else {
      item.quantity -= 1;
      this.ProductService.allTotalPriceAndQuantity(item, this.basket);
      this.ProductService.updateProductToBasket(item).subscribe(() => {
      });
    }
  }

  plusItem(item: IProducts) {
    item.quantity += 1;
    this.ProductService.allTotalPriceAndQuantity(item, this.basket);
    this.ProductService.updateProductToBasket(item).subscribe(() => {
    });
  }


  ngOnDestroy() {
    if (this.basketSubscription) {
      this.basketSubscription.unsubscribe();
    }
  }

  private updateEmptyBasketFlag() {
    this.emptyBasket = this.basket.length === 0;
  }
}
