import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ProductsService} from '../../../../service/products.service';
import {IProducts} from '../../../../models/products';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  products: IProducts[];


  constructor(public router: Router,
              public ProductService: ProductsService) {
  }

  ngOnInit() {
  }

  isSignInPage(): boolean {
    return this.router.url === '/';
  }
}
