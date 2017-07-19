import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

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
  public doRegesteration(email : string){
    this.cashe.get_http(`${this.CONFIG.API}/${email}`,'user').map(
      res=> <User>res.json());
  }
}
