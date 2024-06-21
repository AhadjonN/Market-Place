import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {IProducts} from '../models/products';
import {catchError, EMPTY, Observable} from 'rxjs';
import {ProductsService} from './products.service';

@Injectable({
  providedIn: 'root'
})
export class ProductResolver implements Resolve<IProducts> {
  constructor(private productService: ProductsService, private router: Router) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IProducts> {
    const id = route.params?.['id'];
    const url = state.url;

    console.log('Called Get Product in resolver...', route);

    let productObservable: Observable<IProducts>;

    if (url.includes('/mouse/')) {
      productObservable = this.productService.getProductMouse(id);
    } else {
      productObservable = this.productService.getProduct(id);
    }

    return productObservable.pipe(
      catchError(() => {
        this.router.navigate(['products']);
        return EMPTY;
      })
    );
  }
}
