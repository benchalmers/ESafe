import { Component, OnInit, ContentChild, ContentChildren } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FeatureComponent } from '../feature/feature.component';
import { QueryList } from '@angular/core';

class LogIn{
  user: string;
  password: string;
}
interface AccessToken {
  access_token: string;
};


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  login: LogIn = {
    user : "",
    password : ""
  };

  token: string;

 

  loggedin: boolean = false;

  constructor(private http: HttpClient) {
  }

  @ContentChildren(FeatureComponent) subfeatures : QueryList<FeatureComponent>;

  _access_token : string = "";

  get access_token() : string {
    return this._access_token;
  }

  set access_token(value: string) {
    this._access_token = value;
    this.subfeatures.forEach(feature => feature.access_token=value);
  }

  ngOnInit() {
  }
   getLogin(login: LogIn) {

    let body = new HttpParams()
      .set('grant_type','password')
      .set('username',login.user)
      .set('password', login.password);

    return this.http.post<AccessToken>('/Token',body.toString(), { 
      headers : new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded')
    });
  }
  submit(login: LogIn):void {
    this.getLogin(login).subscribe( 
                               (data : AccessToken) => {
                                  this.loggedin = true;
                                  this.access_token = data.access_token;
                                },
                                err => {
                                  alert("error");
                                }
                            );
  }
  
}
