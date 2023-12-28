import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {ProductsService} from '../../../../service/products.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(public router: Router,
              public ProductService: ProductsService) {
  }

  isSignInPage(): boolean {
    return this.router.url === '/';
  }
}
