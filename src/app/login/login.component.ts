import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from './../../environments/environment';
import { UserServiceService } from '../user-service.service';

import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: any;

  errorMessage = "";

  btnMessage = "Login";

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private userService: UserServiceService, private router: Router) {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.email],
      pass: ['', Validators.required]
    });
  }

  ngOnInit(): void {

  }

  login() {

    this.btnMessage = "Logging in...";
    
    this.errorMessage = "";

    var body = { email: this.loginForm.get("email").value, pass: this.loginForm.get("pass").value };

    this.http.post(environment.apiURL + "/login", body, { responseType: 'text' }).subscribe((data) => {
      console.log(data);
      this.errorMessage = JSON.parse(data).message;
      if (JSON.parse(data).token != undefined) {
        this.userService.logIn(JSON.parse(data).token);
        this.router.navigateByUrl('/dashboard');
      }
      this.btnMessage = "Login";
    }, (error) => {
      console.log(error);
      this.errorMessage = error.error;
      this.btnMessage = "Login";
    });
  }
}