import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from './../../environments/environment';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: any;

  errorMessage = "";

  constructor(private formBuilder: FormBuilder, private http: HttpClient) {
    this.registerForm = this.formBuilder.group({
      email: ['', Validators.email],
      pass: ['', Validators.required]
    });
  }

  ngOnInit(): void {

  }

  register() {
    this.errorMessage = "";
    var body = { email: this.registerForm.get("email").value, pass: this.registerForm.get("pass").value };
    console.log(body);
    this.http.post(environment.apiURL + "/register", body, { responseType: 'text' }).subscribe((data) => {
      console.log(data);
      this.errorMessage = data;
    }, (error) => {
      console.log(error);
      this.errorMessage = error.error;
    });
  }

}