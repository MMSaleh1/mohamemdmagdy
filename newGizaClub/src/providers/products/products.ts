import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import {RootProvider} from '../root/root';

import {CacheProvider } from '../cache/cache';


/*
  Generated class for the ProductsProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class ProductsProvider extends RootProvider {

  private GetCategory : string="GetCategory";
  private GetProduct : string="GetProduct";
  private InvoiceHeader: string="AddInvoiceHeader";
  private InvoiceItem: string = "AddInvoiceitem";
  private getPos :string = "getPos";
  constructor(public http: Http , public cacheProvider : CacheProvider) {
    super(http);
    console.log('Hello ProductsProvider Provider');
  }
  public get_category():Observable<any>{
   return this.http.get(`${this.CONFIG.API}${this.GetCategory}`).map(res=><any>res.json());
  }
  public get_products():Observable<any>{
    return this.http.get(`${this.CONFIG.API}${this.GetProduct}`).map(res=><any>res.json());

  }
  public get_Pos():Observable<any>{
    return this.http.get(`${this.CONFIG.API}${this.getPos}`).map(res=><any>res.json());
  }
  //Order : first step


  //item_count: the quantity of product
  //total_price: (product price)*(qunatity)
  //id : the userid
  //pMethod : 41 for cash , 61 for balance 
  //rfid is optional (if there is no id  the query use the rfid) (not used in the app)
  // user-id is not used in the app (used for the sale device in the restaurants)
  public add_invoice_header(item_count:number,total_price:number,id:string,pMethod:number,pointID:number,tableCode:number,ToGo:number,deliverytime:string):Observable<any>{

    return this.http.get(`${this.CONFIG.API}${this.InvoiceHeader}?item_count=${item_count}&total_price=${total_price}&id=${id}&rfid=0&pMethod=${pMethod}&user_id=0&pointID=${pointID}&tableCode=${tableCode}&ToGo=${ToGo}&deliverytime=${deliverytime}`).map(res=><any>res.json());

  }
  

  public add_invoice_item(category_id:string,prod_id:string,quantity:number,price:number,id:string,pMethod:number,invNo:number):Observable<any>{
    
    return this.http.get(`${this.CONFIG.API}${this.InvoiceItem}?category_id=${category_id}&prod_id=${prod_id}&quatity=${quantity}&price=${price}&id=${id}&rfid=0&pMethod=${pMethod}&invNo=${invNo}`).map(res=><any>res.json());

  }


}
