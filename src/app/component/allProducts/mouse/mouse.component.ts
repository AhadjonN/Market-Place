import {Component, OnInit, OnDestroy} from '@angular/core';
import {Subscription} from 'rxjs';
import {ProductsService} from "../../../../service/products.service";
import {IProducts} from "../../../../models/products";

@Component({
  selector: 'app-mouse',
  templateUrl: './mouse.component.html',
  styleUrls: ['./mouse.component.scss']
})
export class MouseComponent implements OnInit, OnDestroy {

  basket: IProducts[];
  mouseProducts: IProducts[];
  favorite: IProducts[];

  isFavorite: boolean;

  private basketSubscription: Subscription;
  private favoriteSubscription: Subscription;
  private productsSubscription: Subscription;

  constructor(protected ProductService: ProductsService) {
  }

  ngOnInit(): void {
    this.productsSubscription = this.ProductService.getMouseProducts().subscribe((products) => {
      this.mouseProducts = products;
    });

    this.basketSubscription = this.ProductService.getProductFromBasket().subscribe((data) => {
      this.basket = data;
    });

    this.favoriteSubscription = this.ProductService.getProductFromFavorite().subscribe((data) => {
      this.favorite = data;
    });

  }

  //Basket service

  addToBasket(product: IProducts): void {
    const findItem = this.basket.find((item) => item.id === product.id);
    if (findItem) {
      this.updateToBasket(findItem);
    } else {
      product.quantity = 1
      product.totalPrice = product.price * product.quantity
      this.postToBasket(product)
    }
    this.updateLocalStorageAndTotal()
  }

  postToBasket(product: IProducts) {
    this.ProductService.postProductBasket(product).subscribe((data) => {
      this.basket.push(data)
      this.updateLocalStorageAndTotal()
    })
  }

  updateToBasket(product: IProducts) {
    product.quantity++;
    product.totalPrice = product.price * product.quantity
    this.ProductService.updateProductToBasket(product).subscribe(() => {
      this.updateLocalStorageAndTotal()
    });
  }

  updateLocalStorageAndTotal() {
    this.ProductService.allTotalPriceAndQuantity(this.basket);
    localStorage.setItem('basket', JSON.stringify(this.basket));
  }

  //Favorite service

  addToFavorite(product: IProducts): void {
    this.isFavorite = this.favorite.some(item => item.id === product.id);

    if (!this.isFavorite) {
      this.postToFavorite(product);
    } else {
      this.removeFromFavorite(product);
    }
  }

  postToFavorite(product: IProducts) {
    this.ProductService.postProductFavorite(product).subscribe((data) =>
      this.favorite.push(data)
    );
  }

  removeFromFavorite(product: IProducts) {
    this.ProductService.deleteProductToFavorite(product.id).subscribe(() => {
      let idx = this.favorite.findIndex((data) => data.id === product.id);
      this.favorite.splice(idx, 1);
    });
  }

  ngOnDestroy(): void {
    if (this.productsSubscription) this.productsSubscription.unsubscribe();
    if (this.basketSubscription) this.basketSubscription.unsubscribe();
    if (this.favoriteSubscription) this.favoriteSubscription.unsubscribe();
  }
}
