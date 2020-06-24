import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  private loggedIn = new BehaviorSubject(false);
  currentLoginStatus = this.loggedIn.asObservable();

  private authToken = "";

  constructor() { }

  logIn(token) {
    this.loggedIn.next(true);
    this.authToken = token;
  }

  logOut() {
    this.loggedIn.next(false);
    this.authToken = "";
  }

  getToken(){
    return this.authToken;
  }
  
}