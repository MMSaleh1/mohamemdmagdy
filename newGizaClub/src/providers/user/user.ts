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

  public regesterUrl:string="regester";
  constructor(public http: Http,private cashe :CashProvider) {
    super(http);
    console.log('Hello UserProvider Provider');
  }
  public regester(phone : string):Observable<any>{
        console.log(`${this.CONFIG.API}${this.regesterUrl}?phone=${phone}`)
     return this.http.get(`${this.CONFIG.API}${this.regesterUrl}?phone=${phone}`).map(
      res=> <any>res.json());
  }
}
