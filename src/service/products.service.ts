import {Injectable, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {IProducts} from '../models/products';
import {BehaviorSubject, forkJoin, map, Subscription} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService implements OnInit {

  opened = false;
  allTotalPrice = 0
  allTotalQuantity = 0;

  url: string = 'http://localhost:3000/product';
  urlMouse: string = 'http://localhost:3000/mouse';
  urlKeyboard: string = 'http://localhost:3000/keyboard';
  urlBasket: string = 'http://localhost:3000/basket';
  urlFavorite: string = 'http://localhost:3000/favorite';

  basket: IProducts[];
  basketSubscription: Subscription;

  favorite: IProducts[];
  favoriteSubscription: Subscription;

  private searchSubject = new BehaviorSubject<string>('');
  private productsSubject = new BehaviorSubject<IProducts[]>([]);

  search$ = this.searchSubject.asObservable();
  products$ = this.productsSubject.asObservable();

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    this.basketSubscription = this.getProductFromBasket().subscribe((data) => {
      this.basket = data;
    });
    this.favoriteSubscription = this.getProductFromFavorite().subscribe((data) => {
      this.favorite = data;
    });
  }

  getAllProducts() {
    return forkJoin({
      laptops: this.http.get<IProducts[]>(this.url),
      mice: this.http.get<IProducts[]>(this.urlMouse),
      keyboard: this.http.get<IProducts[]>(this.urlKeyboard)
    }).pipe(
      map(result => [...result.mice, ...result.laptops, ...result.keyboard])
    );
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

  //mouse
  getMouseProducts() {
    return this.http.get<IProducts[]>(this.urlMouse);
  }

  getProductMouse(id: number) {
    return this.http.get<IProducts>(`${this.urlMouse}/${id}`);
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

  //Keyboard
  getKeyboardProducts() {
    return this.http.get<IProducts[]>(this.urlKeyboard);
  }

  getProductKeyboard(id: number) {
    return this.http.get<IProducts>(`${this.urlKeyboard}/${id}`);
  }

  // favorite products
  getProductFromFavorite() {
    return this.http.get<IProducts[]>(this.urlFavorite);
  }

  postProductFavorite(product: IProducts) {
    return this.http.post<IProducts>(this.urlFavorite, product);
  }

  deleteProductToFavorite(id: number) {
    return this.http.delete<any>(`${this.urlFavorite}/${id}`);
  }

// other
  toggleOpened() {
    this.opened = !this.opened;
    if (this.opened) {
      document.body.style.overflow = 'hidden';
      this.opened = true;
    } else {
      document.body.style.overflow = 'auto';
    }
  }

  updateSearch(search: string) {
    this.searchSubject.next(search);
  }

  updateProducts(products: IProducts[]) {
    this.productsSubject.next(products);
  }

  allTotalPriceAndQuantity(basket: IProducts[]): void {
    this.allTotalPrice = basket.reduce((acc, product) => acc + product.totalPrice, 0);
    this.allTotalQuantity = basket.reduce((acc, product) => acc + product.quantity, 0);
  }
}
