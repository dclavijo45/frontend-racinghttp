import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthBehaviorSubjectService {
  isLogin = new BehaviorSubject<boolean>(this.checkToken());

  private checkToken() : boolean {
    return !!localStorage.getItem('token');
  }
    constructor(private router: Router) { }

    login(token:string) : void {
    localStorage.setItem('token', token);
    this.isLogin.next(true);
  }

    logout() : void {
    localStorage.removeItem('token');
    //temp
    this.router.navigate(['/login'])
    
    this.isLogin.next(false);
  }


  isLoggedIn() : Observable<boolean> {
    return this.isLogin.asObservable();
   }
}
