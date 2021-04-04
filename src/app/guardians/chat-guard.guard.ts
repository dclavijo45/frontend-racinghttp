import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthBehaviorSubjectService } from '../services/auth-behavior-subject.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ChatGuardGuard implements CanActivate {

  constructor(private auth: AuthBehaviorSubjectService,
    private route: Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return new Promise((resolve, reject) => {

      this.auth.isLoggedIn().subscribe(
        login => {
          if (login) {
            resolve(true);
          } else {
            this.route.navigate(['/']);
            resolve(false);
          }
      });
    });
  }

}
