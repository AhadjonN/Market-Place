import {Component, OnInit} from '@angular/core';
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
