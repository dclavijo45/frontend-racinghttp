import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthBehaviorSubjectService } from '../services/auth-behavior-subject.service';
import { UpdateProductService } from 'src/app/services/update-product.service';

@Injectable({
  providedIn: 'root'
})
export class UpdateProductGuard implements CanActivate {
  constructor(private auth: AuthBehaviorSubjectService,
    private route: Router,
    private updateP: UpdateProductService){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return new Promise((resolve, reject) => {

      this.auth.isLoggedIn().subscribe(
        login => {
          if (login) {
            if (!this.updateP.product_id) {
              this.route.navigate(['/tusproductos']);
            }
            resolve(true);
          } else {
            this.route.navigate(['/']);
            resolve(false);
          }
      });
    });
  }

}
