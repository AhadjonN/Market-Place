import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ProductsService} from '../../../../service/products.service';
import {IProducts} from '../../../../models/products';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {DialogBoxComponent} from '../../dialog-box/dialog-box.component';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(public router: Router,
              public ProductService: ProductsService,
              public dialog: MatDialog,
  ) {
  }

  products: IProducts[];
  productsSubscription: Subscription;

  search: string = '';
  canEdit: boolean = false;

  ngOnInit() {
    this.canEdit = true;
    this.productsSubscription = this.ProductService.getProducts().subscribe((data) => {
      this.products = data;
    });
    this.getProducts();
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
          this.postData(data);
      }
    })
  }

// Product service
  postData(data: IProducts) {
    this.ProductService.postProduct(data).subscribe((data) => {
      this.products.push(data);
    });
  }

  //search
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

  isSignInPage(): boolean {
    return this.router.url === '/';
  }

  ngOnDestroy() {
    if (this.productsSubscription) this.productsSubscription.unsubscribe();
  }

}
