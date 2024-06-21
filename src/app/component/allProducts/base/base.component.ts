import {Component, OnInit} from '@angular/core';
import {IProducts} from '../../../../models/products';
import {Subscription} from 'rxjs';
import {ProductsService} from '../../../../service/products.service';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {DialogBoxComponent} from "../../dialog-box/dialog-box.component";


@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss']
})
export class BaseComponent implements OnInit {
  search: string = '';

  constructor(public ProductService: ProductsService,
              public dialog: MatDialog,
  ) {
  }


  products: IProducts[];
  basket: IProducts[];
  favorite: IProducts[];

  isFavorite: boolean;
  canEdit: boolean = false;

  private productsSubscription: Subscription;
  private basketSubscription: Subscription;
  private favoriteSubscription: Subscription;
  private searchSubscription: Subscription;

  ngOnInit() {
    this.canEdit = true;
    this.productsSubscription = this.ProductService.products$.subscribe((data) => {
      this.products = data;
    });

    this.searchSubscription = this.ProductService.search$.subscribe((search) => {
      this.search = search;
      this.searchProducts();
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

  //Basket service

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

//   openDialog(product?: IProducts): void {
//     let dialogConfig = new MatDialogConfig();
//     dialogConfig.width = '500px';
//     dialogConfig.disableClose = true;
//     dialogConfig.data = product;
//     const dialogRef = this.dialog.open(DialogBoxComponent, dialogConfig);
//
//     dialogRef.afterClosed().subscribe((data) => {
//
//       if (data) {
//         if (data && data.id) {
//           this.editItem(data);
//         } else
//           this.postData(data);
//       }
//     });
//   }
//
// // Product service
//
//   postData(data: IProducts) {
//     this.ProductService.postProduct(data).subscribe((data) => this.products.push(data));
//   }
//
//   deleteItem(id: number) {
//     this.ProductService.deleteProduct(id).subscribe(() => this.products.find((item) => {
//       if (id === item.id) {
//         let idx = this.products.findIndex((data) => data.id === id);
//         this.products.splice(idx, 1);
//       }
//     }));
//   }
//
//   editItem(product: IProducts) {
//     this.ProductService.updateProduct(product).subscribe((data) => {
//       this.products = this.products.map((product) => {
//         if (product.id === data.id) return data;
//         else return product;
//       });
//     });
//   }

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
    this.ProductService.getProducts().subscribe((products) => {
      this.ProductService.updateProducts(products);
    });
  }

  // ngOnDestroy

  ngOnDestroy() {
    if (this.productsSubscription) this.productsSubscription.unsubscribe();
    if (this.basketSubscription) this.basketSubscription.unsubscribe();
    if (this.favoriteSubscription) this.favoriteSubscription.unsubscribe();
    if (this.searchSubscription) this.searchSubscription.unsubscribe();
  }
}
