import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {NativeStorage} from '@ionic-native/native-storage';

import {User} from '../../templates/usertemplate';

import {ProductsProvider} from '../../providers/products/products';
import {Resturant , Product , Category} from '../../templates/resturantstemplate';

/**
 * Generated class for the OrderPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-order',
  templateUrl: 'order.html',
})
export class OrderPage {
  public name = "Orders";
  private orders : Array<{
    item: Product;
    quantity: number; 
  }>;

  public user : User ;
  public totalPrice:number = 0;
  public tableCode : number = 0;
  public paymentMethods : Array<{
    name : string  ;
    number : number;
  }>
  public paymentMethod :number = 61 ;
  public resturant : any;
  

  constructor(public navCtrl: NavController,
     public navParams: NavParams ,
      public natStorage : NativeStorage ,
      public ProdProvider :ProductsProvider,
    ) {
    this.paymentMethods=[{
      name : "cash",
      number : 41
    },
    {
      name : "balance",
      number : 61
    }
  ]
    this.orders = this.navParams.get("orders");
    this.resturant = this.navParams.get("resturant");
    for(let i =0; i< this.orders.length;i++){
      this.totalPrice += (this.orders[i].item.price*this.orders[i].quantity);
    }
    
    this.user=new User("mohammed",'20',"assets/img/profileTemp.png","false",'3147','1000','01099297597','mohammed.magdy.ali.96@gmail.com@edge','male',null,50);
    this.natStorage.getItem('user').then(data=>{
       this.user.image="assets/img/profileTemp.png";
      this.user.membershipType=data.membershipType;
      this.user.gender=data.gender;
      this.user.memberId=data.memberId;
      this.user.username=data.username;
      this.user.Relation=data.Relation;
      this.user.mobile=data.mobile;
      this.user.email=data.email;
      this.user.familyId=data.familyId;
    },err=>{
      console.log(err);
    })
  }




  public changePayment(payment : string ){
    if(payment == "cash"){
      this.paymentMethod = 41;
    }else if(payment == "balance"){
      this.paymentMethod = 61;
    }

  }
  public confirmOrder(){
    if(this.tableCode >0 && this.tableCode <= 100){
    let count = 0;
    
    for(var i =0 ; i<this.orders.length;i++){
      count += this.orders[i].quantity;
    }
    console.log(count);
    let today  = new Date();
    let time = today.getHours()+":"+today.getMinutes();
    if((this.user.balanceMoney >= this.totalPrice && this.paymentMethod == 61)|| this.paymentMethod ==41 ){
    this.ProdProvider.add_invoice_header(count,this.totalPrice,this.user.memberId,this.paymentMethod,this.resturant.id,this.tableCode,0,time).subscribe(data=>{

    let invId=data;
    for(var i = 0;i<this.orders.length;i++){
      if(this.orders[i].quantity > 0){
        this.ProdProvider.add_invoice_item(this.orders[i].item.categoryId,this.orders[i].item.id,this.orders[i].quantity,this.orders[i].item.price,this.user.memberId,this.paymentMethod,invId).subscribe(Data=>{
      alert(Data);
    },Err=>{
      alert(Err);
    })
      }
      
    }
    
  },err=>{
    console.log(err);
  })
  }else{
    alert("you dont have enougth money in your balance");
  }
  }else{
    alert("enter valid table number");
  }
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderPage');
  }

}
