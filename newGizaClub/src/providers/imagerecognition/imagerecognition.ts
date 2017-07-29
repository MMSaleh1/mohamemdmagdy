import { Injectable } from '@angular/core';
import { Http,URLSearchParams ,ResponseContentType  } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';


/*
  Generated class for the ImagerecognitionProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
  var cordova : any;
@Injectable()
export class ImagerecognitionProvider {
  private cToken:string="12b84671ea14431f"; //the colection token
  private quarryUrl:string="https://search.craftar.net/v2/search";
  constructor(public http: Http) {
  }
  public quarryImage(image : any):Observable<any[]>{
    //cordova.plugins.comcatchoomcraftar.setCollectionWithToken(this.cToken);
    let data = new URLSearchParams();
    data.append('token', this.cToken);
    data.append('image', image);
    return this.http.post(`${this.quarryUrl}`,data, {responseType: ResponseContentType.Blob}).map(res=><any[]>res.json());

  }

}
