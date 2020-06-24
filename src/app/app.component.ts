import { Component, OnInit } from '@angular/core';
import { UserServiceService } from './user-service.service';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  loginStatus = false;

  constructor(private userService: UserServiceService, private router: Router, private titleService: Title) {

    this.userService.currentLoginStatus.subscribe(status => this.loginStatus = status);


    this.titleService.setTitle( "urlshorten02-frontend" );
  }
  title = 'urlshorten02-frontend';

  logout() {
    this.userService.logOut();
    this.router.navigateByUrl('/login');
  }
}
