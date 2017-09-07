import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {RootProvider} from '../root/root';
import { Observable } from 'rxjs/Observable';

/*
  Generated class for the NewsProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class NewsProvider extends RootProvider {
  private GetNews="GetNews";
  constructor(public http: Http) {
    super(http);
  }
  public getnews(memberid :string):Observable<any>{
    return this.http.get(`${this.CONFIG.API}${this.GetNews}?MemberID=${memberid}`).map(res=><any>res.json());
  }

}
