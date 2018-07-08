import { Component, OnInit, Injectable } from '@angular/core';
import {HttpClient, HttpHeaders}from '@angular/common/http';import { Observable } from '../../../node_modules/rxjs';
;



export interface CreateFeature {
  Name : string,
  Hypothesis : string,
  NonFunctional : string,
  BusinessValue : number,
  Opportunity : number,
  Urgency: number,
  Size: number,
}

export interface UpdateFeature extends CreateFeature {
  Id : number
}

export interface Feature extends UpdateFeature{
  WSJF: number
};


@Injectable({providedIn: 'root'})
class FeatureService{

  //FIXME This service lacks error handling - which means if we get an error the functions behave really badly.

  constructor(private http : HttpClient){};
  async getList(access_token : string)
  {
    return await this.http.get<Feature[]>('/api/Feature/List', {headers : new HttpHeaders().set('Authorization','Bearer '+access_token)}).toPromise();  
  }
  async addFeature(access_token: string, feature: CreateFeature){
    await this.http.post('/api/Feature/Add',feature, {headers : new HttpHeaders().set('Authorization','Bearer '+access_token)}).toPromise();
  }
  async updateFeature(access_token: string, feature: UpdateFeature){
    await this.http.put('/api/Feature/'+feature.Id.toString(), feature, {headers : new HttpHeaders().set('Authorization','Bearer '+access_token)}).toPromise();
  }
  async deleteFeature(access_token: string, feature: UpdateFeature){
    await this.http.delete('/api/Feature/'+feature.Id.toString(), {headers : new HttpHeaders().set('Authorization','Bearer '+access_token)}).toPromise();
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
    this.updateFeatures();
  }

  async updateFeatures(){
    await this.featureserv.getList(this.access_token).then(features => this.features = features.sort((a,b) => b.WSJF-a.WSJF))
  }

  public get access_token():string {
    return this._access_token;
  }

  trackById(index, feature:Feature)
  {
    return feature.Id;
  }

  async onUpdate(newfeature){
    await this.featureserv.updateFeature(this.access_token, newfeature);
    await this.updateFeatures();
  }

  async onDelete(delfeature){
    await this.featureserv.deleteFeature(this.access_token, delfeature);
    await this.updateFeatures();
  }

  async newFeature() {
    let nf : CreateFeature = {
            Name : "Untitled Feature",
            Hypothesis: "Add hypothesis here",
            NonFunctional : "Add non-functional requirements here",
            BusinessValue : 0,
            Opportunity: 0,
            Urgency: 0,
            Size: 1
    };
    await this.featureserv.addFeature(this.access_token, nf);
    await this.updateFeatures();
  }

  ngOnInit() {
    
  }

}
