import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ProductsService} from '../../../../service/products.service';
import {IProducts} from '../../../../models/products';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {Subscription} from 'rxjs';
import {DialogBoxComponent} from '../../dialog-box/dialog-box.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(public router: Router,
              public ProductService: ProductsService,
              public dialog: MatDialog,
              private cdr: ChangeDetectorRef
  ) {
  }

  products: IProducts[];
  basket: IProducts[];
  productsSubscription: Subscription;

  search: string = '';
  canEdit: boolean = false;

  ngOnInit() {

    const savedBasket = localStorage.getItem('basket');
    if (savedBasket) {
      this.basket = JSON.parse(savedBasket);
      this.ProductService.allTotalPriceAndQuantity(this.basket);
      this.cdr.detectChanges();
    }

    this.canEdit = true;
    this.productsSubscription = this.ProductService.getProducts().subscribe((data) => {
      this.products = data;
    });
    this.getProducts();
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
//     this.ProductService.postProduct(data).subscribe((data) => {
//       this.refreshProducts();
//     });
//   }
//
//   editItem(product: IProducts) {
//     this.ProductService.updateProduct(product).subscribe((data) => {
//       this.refreshProducts();
//     });
//   }
//
//   refreshProducts() {
//     this.ProductService.getProducts().subscribe((products) => {
//       this.ProductService.updateProducts(products);
//     });
//   }

  searchProducts() {
    this.ProductService.updateSearch(this.search);
  }

  getProducts() {
    this.ProductService.getProducts().subscribe(products => {
      this.products = products;
    });
  }

  isSignInPage(): boolean {
    return this.router.url === '/';
  }

  ngOnDestroy() {
    if (this.productsSubscription) this.productsSubscription.unsubscribe();
  }

}
