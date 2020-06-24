import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from './../../environments/environment';



@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {


  resetOne: any;
  resetTwo: any;

  errorMessageOne = "";
  errorMessageTwo = "";

  constructor(private formBuilder: FormBuilder, private http: HttpClient) {
    this.resetOne = this.formBuilder.group({
      email: ['', [Validators.email, Validators.required]]
    });

    this.resetTwo = this.formBuilder.group({
      secret: ['', Validators.required],
      newPass: ['', Validators.required]
    });
  }

  ngOnInit(): void {

  }

  resetStepOne() {
    this.errorMessageOne = "";
    var body = { email: this.resetOne.get("email").value };
    console.log(body);
    this.http.post(environment.apiURL + "/resetStepOne", body, { responseType: 'text' }).subscribe((data) => {
      console.log(data);
      this.errorMessageOne = data;
    }, (error) => {
      console.log(error);
      this.errorMessageOne = error.error;
    });
  }

  resetStepTwo() {
    this.errorMessageTwo = "";
    var body = { email: this.resetOne.get("email").value, secret: this.resetTwo.get("secret").value, newPass: this.resetTwo.get("newPass").value };
    console.log(body);
    this.http.post(environment.apiURL + "/resetStepTwo", body, { responseType: 'text' }).subscribe((data) => {
      console.log(data);
      this.errorMessageTwo = data;
    }, (error) => {
      console.log(error);
      this.errorMessageTwo = error.error;
    });
  }


}