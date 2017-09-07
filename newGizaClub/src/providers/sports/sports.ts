import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {RootProvider} from '../root/root';
import { Observable } from 'rxjs/Observable';
/*
  Generated class for the SportsProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class SportsProvider  extends RootProvider{
  private allSports="GetSports";
  private allDetails="GetSportsDetails";
  private SportRegistration ="SportRegistration";
  constructor(public http: Http) {
    super(http);
  }
  public getSports() : Observable<any>{
    return this.http.get(`${this.CONFIG.API}${this.allSports}`).map(res=> <any>res.json());
  }
  public getSportsDetails(sportid: string) : Observable<any>{
    return this.http.get(`${this.CONFIG.API}${this.allDetails}?SportID=${sportid}`).map(res=><any>res.json());
  }
  public joinSport(sportId:any,teamid:any,ScheduleID :any , MemberID :any ,CostAmount : any ):Observable<any>{
    return this.http.get(`${this.CONFIG.API}${this.SportRegistration}?SportID=${sportId}&TeamID=${teamid}&ScheduleID=${ScheduleID}&MemberID=${MemberID}&CostAmount=${CostAmount}`).map(res=><any>res.json());
  }

}
