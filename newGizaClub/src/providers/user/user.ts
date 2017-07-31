import { Injectable } from '@angular/core';
import { Http,Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import {CashProvider} from '../cash/cash';
import {User} from '../../templates/usertemplate';

import {RootProvider} from '../root/root';
/*
  Generated class for the UserProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class UserProvider extends RootProvider {

  constructor(public http: Http,private cashe :CashProvider) {
    super(http);
    console.log('Hello UserProvider Provider');
  }
  public doRegesteration(email : string):Observable<any>{
     const header = new Headers();
        header.append('Access-Control-Allow-Headers', 'Content-Type');
        header.append('Access-Control-Allow-Methods', 'GET');
        header.append('Access-Control-Allow-Origin', '*');
        console.log(`${this.CONFIG.API}GetActivationEmailBased?email=${email}`)
     return this.http.get(`${this.CONFIG.API}GetActivationEmailBased?email=${email}`,{headers : header }).map(
      res=> <any>res.json());
  }
}
