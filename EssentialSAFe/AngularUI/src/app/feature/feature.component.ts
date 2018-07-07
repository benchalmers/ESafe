import { Component, OnInit, Injectable } from '@angular/core';
import {HttpClient, HttpHeaders}from '@angular/common/http';import { Observable } from '../../../node_modules/rxjs';
;

interface Feature {
  Id : number,
  Name : string,
  NonFunctional : string,
  BusinessOpportunity : number,
  Opportunity : number,
  Urgency: number,
  Size: number,
  WSJF: number
};

@Injectable({providedIn: 'root'})
class FeatureService{
  constructor(private http : HttpClient){};
  getList(access_token : string):Observable<Feature[]>
  {
    return this.http.get<Feature[]>('/api/Feature/List', {headers : new HttpHeaders().set('Authorization','Bearer '+access_token)});  
  }
}

@Component({
  selector: 'app-feature',
  templateUrl: './feature.component.html',
  styleUrls: ['./feature.component.css']
})
export class FeatureComponent implements OnInit {

  constructor(private featureserv : FeatureService) { }
  features: Feature[];
  private  _access_token : string = "";
  public set access_token(token :string)
  {
    this._access_token=token;
    this.featureserv.getList(this.access_token).subscribe(features => this.features = features)
  }
  public get access_token():string {
    return this._access_token;
  }

  ngOnInit() {
    
  }

}
