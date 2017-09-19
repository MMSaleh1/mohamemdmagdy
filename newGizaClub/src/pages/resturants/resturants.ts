import { Component } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';
import {NativeStorage} from '@ionic-native/native-storage';


import {ProductsProvider} from '../../providers/products/products';
import {Resturant , Product , Category} from '../../templates/resturantstemplate';
import {OrderPage} from '../order/order';
/**
 *
 * Generated class for the ResturantsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-resturants',
  templateUrl: 'resturants.html',
})
export class ResturantsPage {
  public name : string ="resturants";
  private orders : Array<{
    item: Product;
    quantity: number;
    mainIndex : number;
  }>;
  private subOrders : Array <{
    item: Product;
    quantity : number;
    mainIndex : number;
  }>;
  public ready : boolean[]=[false,false,false];
  //ready[0] check the POS
  //ready[1] check the products
  //ready[2] check the categories
  public haveMenu :boolean =false;
  private resturants : Resturant[] ;

  private categories : Category[] ;

  private products : Product[] ;

    private choosenResturant :any;

    public choosenProducts :Array<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams,public ProdProvider:ProductsProvider,public natStorage : NativeStorage) {
    this.choosenResturant =this.navParams.get("resturant");
    this.name=this.choosenResturant.name;
    this.categories = new Array();
    this.categories[0] = new Category("All","-2");
    if(this.choosenResturant != undefined){
      if(this.choosenResturant.products.length >0){
    for(var i =0;i< this.choosenResturant.products.length;i++)
      {
        
        let newCategory = true;
        for(var j = 0 ;j<this.categories.length;j++){
          if(this.categories[j].id == this.choosenResturant.products[i].category.id){
            console.log( this.choosenResturant.products[i].category.id);
            newCategory = false;
          }
        }
        if(newCategory ==true){
          this.categories[this.categories.length]=this.choosenResturant.products[i].category;
      }
  }
 
}

console.log(this.categories);
this.setResturant(this.choosenResturant);
this.filter(this.categories[0]);
this.haveMenu = true;
}
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad ResturantsPage');
  }
  setResturant(resturant : any){
    this.choosenResturant = resturant;
    this.orders= new Array();
    this.subOrders = new Array();
    this.orders.length =this.choosenResturant.products.length;
    for(var i =0;i<this.orders.length;i++){
      this.orders[i] ={item :this.choosenResturant.products[i],quantity:0 ,mainIndex : i}
     //console.log(this.orders[i]);
     
    }
    console.log(this.orders.keys());
    }

  changeNumber(func : String,index : any){
   // console.log(this.orders.length);
    
    //this.subOrders[index].item=this.choosenResturant.products[index]; //order is important  first change the item from defult

    if(func == 'add' && this.subOrders[index].quantity < this.subOrders[index].item.quantity){
      this.subOrders[index].quantity++; // then change its quantity
    }else if(func == 'remove'){
      if(this.subOrders[index].quantity!=0){
          
          this.subOrders[index].quantity--;
      }
        
      
    }
    //console.log(this.orders);
  }
  order(){
    let totalPrice =0;
    if(this.subOrders.length>0){
      for(var i = 0;i<this.subOrders.length;i++){
        this.orders[this.subOrders[i].mainIndex].quantity=this.subOrders[i].quantity;
      }
    }
    for(let i =0; i< this.orders.length;i++){
      totalPrice += (this.orders[i].item.price*this.orders[i].quantity);
      
      console.log(this.orders[i].item.name ,":",this.orders[i].quantity)
    }
    console.log(totalPrice);
    console.log(this.orders);
    this.navCtrl.push(OrderPage,{"orders":this.orders , "resturant": this.choosenResturant});
  }







  public filter(category : Category){
    this.choosenProducts = new Array();
    console.log(category);
    let counter =0;
    if(this.subOrders.length>0){
      for(var i = 0;i<this.subOrders.length;i++){
        this.orders[this.subOrders[i].mainIndex].quantity=this.subOrders[i].quantity;
      }
    }
    this.subOrders=new Array();
    if(category.id =='-2'){
      this.choosenProducts = this.choosenResturant.products;
      this.subOrders = this.orders;
    }else{
      for(var i =0;i<this.choosenResturant.products.length;i++){
        if(this.choosenResturant.products[i].category.id == category.id )
          {
            this.choosenProducts[counter]=this.choosenResturant.products[i];
            this.subOrders[counter] =this.orders[i];
            counter++;
          }
      }
      console.log(this.subOrders);
    }
  }
  

}
