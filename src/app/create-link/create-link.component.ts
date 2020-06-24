import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserServiceService } from '../user-service.service';
import { environment } from './../../environments/environment';

@Component({
  selector: 'app-create-link',
  templateUrl: './create-link.component.html',
  styleUrls: ['./create-link.component.css']
})
export class CreateLinkComponent implements OnInit {

  urlForm: any;

  errorMessage = "";

  shortURL = "";

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private userService: UserServiceService) {
    this.urlForm = this.formBuilder.group({
      longURL: ['', Validators.required],
    });
  }

  ngOnInit(): void {
  }

  shortenURL() {
    var body = { url: this.urlForm.get("longURL").value };

    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.userService.getToken(),
      'responseType': 'json'
    });

    let options = { headers: headers };

    this.http.post(environment.apiURL + "/shorten", body, options).subscribe((data) => {
      this.errorMessage = data['message'];
      this.shortURL = data['link'];
    },
      (error) => {
        console.log(error);
        this.errorMessage = error['error']['message'];
      });
  }

}