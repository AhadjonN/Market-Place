import {Injectable, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {IProducts} from '../models/products';
import {Subscription} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService implements OnInit {

  opened = false;
  allTotalPrice: number;
  allTotalQuantity: number;

  url: string = 'http://localhost:3000/product';
  urlBasket: string = 'http://localhost:3000/basket';

  basket: IProducts[];
  basketSubscription: Subscription;

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    this.basketSubscription = this.getProductFromBasket().subscribe((data) => {
      this.basket = data;
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

// other

  toggleOpened() {
    this.opened = !this.opened;
  }

  allTotalPriceAndQuantity(product: IProducts, basket: IProducts[]): void {
    product.totalPrice = product.price * product.quantity;
    this.allTotalPrice = basket.reduce((acc, product) => acc + product.totalPrice, 0);
    this.allTotalQuantity = basket.reduce((acc, product) => acc + product.quantity, 0);
  }

}
