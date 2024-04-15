import {Injectable, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {IProducts} from '../models/products';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ProductsService implements OnInit {

  opened = false;
  allTotalPrice: number = 0;
  allTotalQuantity: number = 0;

  url: string = 'http://localhost:3000/product';
  urlBasket: string = 'http://localhost:3000/basket';
  urlFavorite: string = 'http://localhost:3000/favorite';

  basket: IProducts[];
  basketSubscription: Subscription;

  favorite: IProducts[];
  favoriteSubscription: Subscription;

  constructor(private http: HttpClient,
              private router: Router) {
  }

  ngOnInit(): void {
    this.basketSubscription = this.getProductFromBasket().subscribe((data) => {
      this.basket = data;
    });
    this.favoriteSubscription = this.getProductFromFavorite().subscribe((data) => {
      this.favorite = data;
    });
  }

// base products
  getProducts() {
    return this.http.get<IProducts[]>(this.url);
  }

  getProduct(id: number) {
    return this.http.get<IProducts>(`${this.url}/${id}`);
  }

  postProduct(product: IProducts) {
    return this.http.post<IProducts>(this.url, product);
  }

  deleteProduct(id: number) {
    return this.http.delete<any>(`${this.url}/${id}`);
  }

  updateProduct(product: IProducts) {
    return this.http.put<IProducts>(`${this.url}/${product.id}`, product);
  }

  // basket products
  getProductFromBasket() {
    return this.http.get<IProducts[]>(this.urlBasket);
  }

  postProductBasket(product: IProducts) {
    return this.http.post<IProducts>(this.urlBasket, product);
  }

  deleteProductToBasket(id: number) {
    return this.http.delete<any>(`${this.urlBasket}/${id}`);
  }

  updateProductToBasket(product: IProducts) {
    return this.http.put<IProducts>(`${this.urlBasket}/${product.id}`, product);
  }

  // favorite products
  getProductFromFavorite() {
    return this.http.get<IProducts[]>(this.urlFavorite);
  }

  postProductFavorite(product: IProducts) {
    return this.http.post<IProducts>(this.urlFavorite, product);
  }

  updateProductToFavorite(product: IProducts) {
    return this.http.put<IProducts>(`${this.urlFavorite}/${product.id}`, product);
  }

  deleteProductToFavorite(id: number) {
    return this.http.delete<any>(`${this.urlFavorite}/${id}`);
  }

// other
  toggleOpened() {
    this.opened = !this.opened;
  }

  allTotalPriceAndQuantity(basket: IProducts[]): void {
    this.allTotalPrice = basket.reduce((acc, product) => acc + product.totalPrice, 0);
    this.allTotalQuantity = basket.reduce((acc, product) => acc + product.quantity, 0);
  }

}
