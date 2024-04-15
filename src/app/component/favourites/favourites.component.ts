import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ProductsService} from '../../../service/products.service';
import {IProducts} from '../../../models/products';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.scss']
})
export class FavouritesComponent implements OnInit {

  favorite: IProducts[];
  favoriteSubscription: Subscription;

  basket: IProducts[];
  basketSubscription: Subscription;

  emptyFavorite = true;

  constructor(public ProductService: ProductsService,
              private cdr: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    const savedBasket = localStorage.getItem('basket');
    if (savedBasket) {
      this.favorite = JSON.parse(savedBasket);
      this.ProductService.allTotalPriceAndQuantity(this.favorite);
      this.cdr.detectChanges();
    }

    this.favoriteSubscription = this.ProductService.getProductFromFavorite().subscribe((data) => {
      this.favorite = data;
      this.updateEmptyFavoriteFlag();
    });

    this.basketSubscription = this.ProductService.getProductFromBasket().subscribe((data) => {
      this.basket = data;
    });

  }

  addToBasket(product: IProducts) {
    product.quantity = 1;
    let findItem;
    if (this.basket.length > 0) {
      findItem = this.basket.find((item) => item.id === product.id);
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

  //Favorite service


  removeFromFavorite(product: IProducts) {
    this.ProductService.deleteProductToFavorite(product.id).subscribe(() => {
      let idx = this.favorite.findIndex((data) => data.id === product.id);
      this.favorite.splice(idx, 1);
    });
  }

  ngOnDestroy() {
    if (this.favoriteSubscription) {
      this.favoriteSubscription.unsubscribe();
    }
  }

  private updateEmptyFavoriteFlag() {
    this.emptyFavorite = this.favorite.length === 0;
  }
}
