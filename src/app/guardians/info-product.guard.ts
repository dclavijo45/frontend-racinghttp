import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { InfoProductService } from '../services/info-product.service';

@Injectable({
  providedIn: 'root',
})
export class InfoProductGuard implements CanActivate {
  constructor(private infoProduct: InfoProductService, private route: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return new Promise((resolve) => {
      this.infoProduct.foundProduct().subscribe((find) => {
        if (find) {
          resolve(true);
        } else {
          this.route.navigate(['/']);
          resolve(false);
        }
      });
    });
  }
}
