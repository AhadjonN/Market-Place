import {Component, OnInit} from '@angular/core';
import {IProducts} from '../../../models/products';
import {Subscription} from 'rxjs';
import {ProductsService} from '../../../service/products.service';
import {DialogBoxComponent} from '../dialog-box/dialog-box.component';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';


@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss']
})
export class BaseComponent implements OnInit {

  constructor(public ProductService: ProductsService,
              public dialog: MatDialog,
  ) {
  }

  products: IProducts[];
  productsSubscription: Subscription;

  basket: IProducts[];
  basketSubscription: Subscription;

  canEdit: boolean = false;

  ngOnInit() {
    this.canEdit = true;
    this.productsSubscription = this.ProductService.getProducts().subscribe((data) => {
      this.products = data;
    });

    this.basketSubscription = this.ProductService.getProductFromBasket().subscribe((data) => {
      this.basket = data;
    });

    this.getProducts();
  }

  //BasketComponent

  addToBasket(product: IProducts) {
    product.quantity = 1;
    product.totalPrice = product.price * product.quantity;
    this.ProductService.allTotalPrice = this.basket.reduce((acc, product) => acc + product.totalPrice, 0);
    this.ProductService.allTotalQuantity = this.basket.reduce((acc, product) => acc + product.quantity, 0);
    let findItem;
    if (this.basket.length > 0) {
      findItem = this.basket.find((item) => item.id === product.id);
      if (findItem) this.updateToBasket(findItem);
      else this.postToBasket(product);
    } else this.postToBasket(product);
  }

  //Basket service

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

  //Dialog

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

  getProducts() {
    this.ProductService.getProducts().subscribe(products => {
      this.products = products;
    });
  }

  ngOnDestroy() {
    if (this.productsSubscription) this.productsSubscription.unsubscribe();
    if (this.basketSubscription) this.basketSubscription.unsubscribe();
  }
}
