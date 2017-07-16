import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ResturantsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-resturants',
  templateUrl: 'resturants.html',
})
export class ResturantsPage {
  private orders : number[];
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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
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
  this.changeResturant(this.resturants[0]);
  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ResturantsPage');
  }
  changeResturant(resturant : any){
    this.chossenResturants = resturant;
    this.orders= [];
    this.orders.length=this.chossenResturants['menu'].length;
    this.orders.fill(0);

  }
  changeNumber(func : String,index : any){
    if(func == 'add'){
      this.orders[index]++;
    }else{
      this.orders[index]--;
    }
    console.log(this.orders);
  }
  order(){
    let totalPrice =0;
    for(let i =0; i< this.orders.length;i++){
      totalPrice += (this.orders[i]*this.chossenResturants['menu'][i].price);
    }
    console.log(totalPrice);
  }

}
