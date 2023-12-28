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

  products: IProducts[];
  productsSubscription: Subscription;

  canEdit: boolean = false;
  canView: boolean = false;

  constructor(public ProductService: ProductsService,
              public dialog: MatDialog,
  ) {
  }

  ngOnInit() {
    this.canEdit = true;
    this.productsSubscription = this.ProductService.getProducts().subscribe((data) => {
      this.products = data;
    });
  }

  openDialog(): void {
    let dialogConfig = new MatDialogConfig();
    dialogConfig.width = '500px';
     const dialogRef = this.dialog.open(DialogBoxComponent, dialogConfig);

  }

  ngOnDestroy() {
    if (this.productsSubscription) this.productsSubscription.unsubscribe();
  }
}

