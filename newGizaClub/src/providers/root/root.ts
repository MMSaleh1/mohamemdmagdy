import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the RootProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class RootProvider {

  public CONFIG={
    "API": "http://services.edge-techno.com/NGSCMobilApi/api/APP/",
    "RELESE":false
  };
  constructor(public http: Http) {
    console.log('Hello RootProvider Provider');
  }

}
