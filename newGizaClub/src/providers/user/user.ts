import { Injectable } from '@angular/core';
import { Http,Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
//import {CashProvider} from '../cash/cash';
import {User} from '../../templates/usertemplate';

import {RootProvider} from '../root/root';
/*
  Generated class for the UserProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class UserProvider extends RootProvider {

  private regesterUrl:string="regester_datatable";
  private getUserData:String="confirm_via_email_and_memberid";
  private changePassword:string="member_update_password";
  private getUserRelatives:string="GetMemberCompleteCircle";
  private getBalanceHistorystring="GetMemberBalanceHistory";

  
  constructor(public http: Http) {
    super(http);
    console.log('Hello UserProvider Provider');
  }
  public regester_datatable(phone : string):Observable<any>{
        console.log(`${this.CONFIG.API}${this.regesterUrl}?mobile=${phone}`)
     return this.http.get(`${this.CONFIG.API}${this.regesterUrl}?mobile=${phone}`).map(
      res=> <any>res.json());
  }


    public confirm_via_email_and_memberid(phone:string , memberId : string):Observable<any>{
      return this.http.get(`${this.CONFIG.API}${this.getUserData}?mobile=${phone}&member_id=${memberId}`).map(
        res=><any>res.json());
    }

    public change_Password(phone:string,password:string):Observable<any>{
      return this.http.get(`${this.CONFIG.API}${this.changePassword}?phone=${phone}&password=${password}`).map(
        res=><any>res.json());
    }

    public get_user_relatives(phone:string , memberId:string):Observable<any>{
      return this.http.get(`${this.CONFIG.API}${this.getUserRelatives}?mobile=${phone}&member_id=${memberId}`).map(
        res=><any>res.json());
    }

    public get_user_balance_history(userId:string):Observable<any>{
      return this.http.get(`${this.CONFIG.API}${this.getBalanceHistorystring}?MemberID=${userId}`).map(res=><any>res.json());
    }
}
