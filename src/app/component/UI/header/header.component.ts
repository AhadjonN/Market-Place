import {Component} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  opened = false;

  constructor(private router: Router) {
  }

  isSignInPage(): boolean {
    return this.router.url === '/';
  }
}
