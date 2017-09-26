import { Component } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';
import {NativeStorage} from '@ionic-native/native-storage';


import {ProductsProvider} from '../../providers/products/products';
import {Product , Category} from '../../templates/resturantstemplate';
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
  }>;
  public ready : boolean[]=[false,false,false];
  //ready[0] check the POS
  //ready[1] check the products
  //ready[2] check the categories
  public haveMenu :boolean =false;


  private categories : Category[] ;

    private choosenResturant :any;

    public choosenProducts :Array<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams,public ProdProvider:ProductsProvider,public natStorage : NativeStorage) {
    this.choosenResturant =this.navParams.get("resturant");
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
    this.orders.length=this.choosenResturant.products.length;
    this.orders.fill({item: new Product(), quantity :0});
    for(var i =0;i<this.orders.length;i++){
      let temp :any ={item :this.choosenResturant.products[i],quantity:0 }
      this.orders[i]=temp;
      //console.log(this.orders[i]);
    }
    }

  changeNumber(func : String,index : any){
   // console.log(this.orders.length);
    
    this.orders[index].item=this.choosenResturant.products[index]; //order is important  first change the item from defult
   // console.log(this.choosenResturant['menu'][index]);
    if(func == 'add' && this.orders[index].quantity < this.orders[index].item.quantity){
      this.orders[index].quantity++; // then change its quantity
    }else if(func == 'remove'){
      if(this.orders[index].quantity!=0){
          
          this.orders[index].quantity--;
      }
        
      
    }
    //console.log(this.orders);
  }
  order(){
    let totalPrice =0;
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
    if(category.id =='-2'){
      this.choosenProducts = this.choosenResturant.products;
    }else{
      for(var i =0;i<this.choosenResturant.products.length;i++){
        if(this.choosenResturant.products[i].category.id == category.id )
          {
            this.choosenProducts[counter]=this.choosenResturant.products[i];
            counter++;
          }
      }
    }
  }
  

}
