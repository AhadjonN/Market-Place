import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {IProducts} from '../../../models/products';
import {Subscription} from 'rxjs';
import {ProductsService} from '../../../service/products.service';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {DialogBoxComponent} from "../dialog-box/dialog-box.component";


@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss']
})
export class BaseComponent implements OnInit {
  search: string = '';
  currentIndex: number = 0;
  images: string[] = ['assets/banner5.jpg', 'assets/banner4.jpg'];

  constructor(private cdr: ChangeDetectorRef,
              public ProductService: ProductsService,
              public dialog: MatDialog,
  ) {
  }

  products: IProducts[];
  productsSubscription: Subscription;

  basket: IProducts[];
  basketSubscription: Subscription;

  favorite: IProducts[];
  favoriteSubscription: Subscription;

  isFavorite: boolean;
  canEdit: boolean = false;

  ngOnInit() {
    this.canEdit = true;
    this.productsSubscription = this.ProductService.getProducts().subscribe((data) => {
      this.products = data;
    });

    this.basketSubscription = this.ProductService.getProductFromBasket().subscribe((data) => {
      this.basket = data;
    });

    this.favoriteSubscription = this.ProductService.getProductFromFavorite().subscribe((data) => {
      this.favorite = data;
    });

    this.getProducts();
  }

  //BasketComponent

  addToBasket(product: IProducts): void {
    product.quantity = 1;

    const existingProduct = this.basket.find((item) => item.id === product.id);
    if (existingProduct) {
      this.updateToBasket(existingProduct);
    } else {
      product.totalPrice = product.price * product.quantity;
      this.basket.push(product);
      this.postToBasket(product);
    }
    this.ProductService.allTotalPriceAndQuantity(this.basket);
    localStorage.setItem('basket', JSON.stringify(this.basket));

  }

  //Basket service

  postToBasket(product: IProducts) {
    this.ProductService.postProductBasket(product).subscribe((data) =>
      this.basket.push(data)
    );
  }

  updateToBasket(product: IProducts) {
    product.quantity++;
    product.totalPrice = product.price * product.quantity;

    this.ProductService.updateProductToBasket(product).subscribe((updatedProduct) => {
      const basketIndex = this.basket.findIndex((item) => item.id === product.id);
      if (basketIndex !== -1) {
        this.basket[basketIndex] = updatedProduct;
      }
     });

  }

  addToFavorite(product: IProducts) {
    this.isFavorite = this.favorite.some(item => item.id === product.id);

    if (!this.isFavorite) {
      this.postToFavorite(product);
    } else {
      this.removeFromFavorite(product);
    }
  }

  //Favorite service

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

  openDialog(product?: IProducts): void {
    let dialogConfig = new MatDialogConfig();
    dialogConfig.width = '500px';
    dialogConfig.disableClose = true;
    dialogConfig.data = product;
    const dialogRef = this.dialog.open(DialogBoxComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((data) => {

      if (data) {
        if (data && data.id) {
          this.editItem(data);
        } else
          this.postData(data);
      }
    });
  }

// Product service

  postData(data: IProducts) {
    this.ProductService.postProduct(data).subscribe((data) => this.products.push(data));
  }

  deleteItem(id: number) {
    this.ProductService.deleteProduct(id).subscribe(() => this.products.find((item) => {
      if (id === item.id) {
        let idx = this.products.findIndex((data) => data.id === id);
        this.products.splice(idx, 1);
      }
    }));
  }

  editItem(product: IProducts) {
    this.ProductService.updateProduct(product).subscribe((data) => {
      this.products = this.products.map((product) => {
        if (product.id === data.id) return data;
        else return product;
      });
    });
  }

  searchProducts() {
    if (this.search.trim() === '') {
      this.getProducts();
      return;
    }
    this.products = this.products.filter(product =>
      product.title.toLowerCase().includes(this.search.toLowerCase())
    );
  }

  getProducts() {
    this.ProductService.getProducts().subscribe(products => {
      this.products = products;
    });
  }

//Banner

  prevSlide() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    } else {
      this.currentIndex = this.images.length - 1;
    }
  }

  nextSlide() {
    if (this.currentIndex < this.images.length - 1) {
      this.currentIndex++;
    } else {
      this.currentIndex = 0;
    }
  }

  ngOnDestroy() {
    if (this.productsSubscription) this.productsSubscription.unsubscribe();
    if (this.basketSubscription) this.basketSubscription.unsubscribe();
  }
}
