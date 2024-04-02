import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {IProducts} from '../../../models/products';
import {Subscription} from 'rxjs';
import {ProductsService} from '../../../service/products.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {

  constructor(public ProductService: ProductsService,
              private cdr: ChangeDetectorRef) {
  }

  basket: IProducts[];
  basketSubscription: Subscription;

  emptyBasket = true;

  ngOnInit(): void {
    const savedBasket = localStorage.getItem('basket');
    if (savedBasket) {
      this.basket = JSON.parse(savedBasket);
      this.ProductService.allTotalPriceAndQuantity(this.basket);
      this.cdr.detectChanges();
    }

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
        localStorage.setItem('basket', JSON.stringify(this.basket));
        this.ProductService.allTotalPriceAndQuantity(this.basket);
      });
    } else {
      item.quantity -= 1;
      item.totalPrice = item.price * item.quantity;
      localStorage.setItem('basket', JSON.stringify(this.basket));
      this.ProductService.allTotalPriceAndQuantity(this.basket);
      this.ProductService.updateProductToBasket(item).subscribe(() => {
      });
    }
  }

  plusItem(item: IProducts) {
    item.quantity += 1;
    item.totalPrice = item.price * item.quantity;
    this.ProductService.allTotalPriceAndQuantity(this.basket);
    localStorage.setItem('basket', JSON.stringify(this.basket));
    this.ProductService.updateProductToBasket(item).subscribe(() => {
    });
  }

  Order() {
    alert('Your order was successfully placed');
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
