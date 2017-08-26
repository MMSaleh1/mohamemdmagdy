import { Component } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';
import {ProductsProvider} from '../../providers/products/products';

import { DatePipe } from '@angular/common';
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
    item: any;
    quantity: number; 
  }>;
  
  private resturants:Array<{
      name : any,
      imageUrl : any,
      des : any,
      menu : Array<{
        name:any,
        imageUrl:any,
        price : number,
        des : any
      }>,
  }>;
    private chossenResturants : any;

  constructor(public navCtrl: NavController, public navParams: NavParams,public ProdProvider:ProductsProvider) {
    this.resturants=[{
      name :'McDonald`s',
      imageUrl:'assets/img/McDonald`s.png',
      des:'Burger',
      menu:[{
        name: 'Big Mac',
        imageUrl: 'assets/img/burger.png',
        price: 12,
        des:'Reguler Burger , 100% Beef patty'
      },{
      name: 'Big Mac2',
        imageUrl: 'assets/img/burger.png',
        price: 12,
        des:'Reguler Burger , 100% Beef patty'
      },{
      name: 'Big Mac3',
        imageUrl: 'assets/img/burger.png',
        price: 12,
        des:'Reguler Burger , 100% Beef patty'
      }
    ]
    },
    {
      name :'BurgerKing',
      imageUrl:'assets/img/BurgerKing.png',
      des:'Burger',
      menu:[{
        name: 'WHOPPER',
        imageUrl: 'assets/img/burger.png',
        price: 12,
        des:'Reguler Burger , 100% Beef patty'
      }]
    },
    
    {
      name :'Domino`sPizza',
      imageUrl:'assets/img/Domino`sPizza.png',
      des:'pizza',
      menu:[{
        name: 'pizza',
        imageUrl: 'assets/img/pizza.png',
        price: 12,
        des:'Reguler Pizza, with your favorite toppings'
      }]
    }
  ];
  this.ProdProvider.get_products().subscribe(data=>{
    console.log(data);
  },err=>{
    console.log(err);
  });
  this.ProdProvider.get_category().subscribe(data=>{
    console.log(data);
  },err=>{
    console.log(err);
  })
 let today  = new Date();
let time = today.getHours()+":"+today.getMinutes();

console.log(time);
  
this.ProdProvider.add_invoice_header(2,20,3147,41,1,1,0,time).subscribe(data=>{
    console.log(data);
    let invId=data;
    this.ProdProvider.add_invoice_item(1,1,1,50.0,3147,41,invId).subscribe(Data=>{
      console.log(Data);
    },Err=>{
      console.log(Err);
    })
  },err=>{
    console.log(err);
  })
  

  if(this.navParams.get("restaurnt")!=undefined){
    this.changeResturant(this.navParams.get("restaurnt"));
  }else{
    this.changeResturant(this.resturants[0]);
  }
  
  
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad ResturantsPage');
  }
  changeResturant(resturant : any){
    this.chossenResturants = resturant;
    this.orders= new Array();
    this.orders.length=this.chossenResturants['menu'].length;
    this.orders.fill({item : null, quantity :0});
    for(var i =0;i<this.orders.length;i++){
      let temp :any ={item :this.chossenResturants["menu"][i],quantity:0 }
      this.orders[i]=temp;
      //console.log(this.orders[i]);
    }

  }
  changeNumber(func : String,index : any){
   // console.log(this.orders.length);
    
    this.orders[index].item=this.chossenResturants['menu'][index]; //order is important  first change the item from defult
   // console.log(this.chossenResturants['menu'][index]);
    if(func == 'add'){
      
      this.orders[index].quantity++; // then change its quantity
    }else{
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
      
     // console.log(this.orders[i].item ,":",this.orders[i].quantity)
    }
    //console.log(totalPrice);
    //console.log(this.orders);
  }

}
