import { Injectable } from '@angular/core';
import { Http,URLSearchParams  ,Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';


/*
  Generated class for the ImagerecognitionProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
  export class WindowRef {
   get nativeWindow() : any {
      return _window();
   } 
}
  function _window() : any {
   // return the global native browser window object
   return window;
}
@Injectable()
export class ImagerecognitionProvider {
  private cToken:string='5a6271be5b664199'; //the colection token
  private quarryUrl:string="https://search.craftar.net/v2/search";
  constructor(public http: Http) {
  }
  public quarryImage(image : any):Observable<any[]>{
   //cordova.plugins.comcatchoomcraftar.setCollectionWithToken(this.cToken);
    //cordova.plugins.comcatchoomcraftar.s
    let data = new URLSearchParams();
    data.append('token', this.cToken);
    data.append('image', image);

    
    let headers = new Headers({ 'content-type': 'multipart/form-data;boundary=FFF'});
    let data2=`--FFF
Content-Disposition: form-data; name="token"
${this.cToken}
--FF
Content-Disposition: form-data; name="image"
${image}
--FFF--`;
if(typeof(image) != undefined){
  alert('we got image');
}
    console.log(data2);
    return this.http.post(`${this.quarryUrl}`,data2,{headers:headers}).map(res=><any[]>res.json());
    

  }

}