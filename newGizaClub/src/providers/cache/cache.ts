import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { NativeStorage } from '@ionic-native/native-storage';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

/*
  Generated class for the CashProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class CacheProvider {

  constructor(public http: Http,private nativeStorage : NativeStorage) {
    console.log('Hello CashProvider Provider');
  }
  public get_http(url :string):Observable<any>{
    let   sub = new Subject();
    this.getFromStrorage(url,(data:any)=>{
      sub.next(data);

    },
    (err:any)=>{
      this.getFromUrl(url,(data:any)=>{
        sub.next(data);
      },
      (err :any)=>{
        sub.next(err);
      }
    )
    }
  )

    return sub;

  }
  private getFromStrorage(location : string, succ : Function ,fail : Function) {
    this.nativeStorage.getItem(location).then(
        (data : any)=> {
          if(data != null && this.isValid(data.time)){
            succ(data.value);
          }else{
            fail();
          }
        }
        ,(err:any)=>{
          fail(err);
        }
    );
    
  }
  private getFromUrl(url : string, succ :Function,fail :Function){
    this.http.get(url).subscribe(
      (data:any)=>{
        this.nativeStorage.setItem(url,
        <CacheReponce>{
						value: data,
						key: url,
						time: new Date(),
						isValid: true
					});
          succ(data);
      },
      (err:any)=>{
        fail(err);
      }
    )
  }
  private isValid(date : Date) :boolean{
    return ((new Date(date).getTime() - new Date().getTime())>= (1000 * 60 * 60 * 24));
  }
  
}
export interface CacheReponce {
	value: any;
	key: string;
	time: Date;
	isValid: boolean;
}
