import { Component } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';
import {ProductsProvider} from '../../providers/products/products';
import {Resturant , Product , Category} from '../../templates/resturantstemplate';
import {OrderPage} from '../order/order';
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
    item: Product;
    quantity: number; 
  }>;
  private ready : boolean = false;
  private resturants : Resturant[] ;

  private categories : Category[] ;

  private products : Product[] ;
  /*
  private resturants:Array<{
      name : any,
      imageUrl : any,
      des : any,
      menu : Array<{
        name:any,
        imageUrl:any,
        price : number,
        des : any,
        id :string,
        quantity: number,
        category: string
      }>,
  }>;
    */
    private chossenResturants :Resturant;

  constructor(public navCtrl: NavController, public navParams: NavParams,public ProdProvider:ProductsProvider) {
    this.resturants = [new Resturant()];
    this.products = [new Product()];
    this.categories = [new Category()];
     let temp = new Resturant("McDonald`s",'1','Burger','assets/img/McDonald`s.png');
     this.resturants[0]= temp;
     console.log(this.resturants);
    this.ProdProvider.get_products().subscribe(data=>{
        if(data.length >0){
          this.products.length = data.length;
          for(var i =0 ; i < data.length ; i++){
            let temp = new Product(data[i].prod_name,data[i].prod_image,data[i].price,data[i].prod_desc,data[i].prod_id,data[i].quantity,data[i].prod_category);
            this.products[i]=temp;
          }
          this.resturants[0].products = this.products;
          this.ready = true;
          
            this.changeResturant(this.resturants[0]);
          
          
          
        }else{
          alert("No product available");
        }
          
        console.log(this.products);
      },err=>{
        console.log(err);
      });
      this.ProdProvider.get_category().subscribe(data=>{
        if(data.length > 0){
          this.categories.length = data.length;
          for(var i =0 ; i < data.length;i++){
            let temp = new Category(data[i].category_name,data[i].category_id);
            this.categories[i] = temp ;
          }
        }
        console.log(data);
      },err=>{
        console.log(err);
      });




      
  
      /*
    this.resturants=[{
      name :'McDonald`s',
      imageUrl:'assets/img/McDonald`s.png',
      des:'Burger',
      menu:[{
        name: 'Big Mac',
        imageUrl: 'assets/img/burger.png',
        price: 12,
        des:'Reguler Burger , 100% Beef patty',
        quantity: 
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
    }

  ,
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
  */
 
 let today  = new Date();
let time = today.getHours()+":"+today.getMinutes();

console.log(time);
 
/*
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
  */


  
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad ResturantsPage');
  }
  changeResturant(resturant : any){
    this.chossenResturants = resturant;
    this.orders= new Array();
    this.orders.length=this.chossenResturants.products.length;
    this.orders.fill({item: new Product(), quantity :0});
    for(var i =0;i<this.orders.length;i++){
      let temp :any ={item :this.chossenResturants.products[i],quantity:0 }
      this.orders[i]=temp;
      //console.log(this.orders[i]);
    }

  }
  changeNumber(func : String,index : any){
   // console.log(this.orders.length);
    
    this.orders[index].item=this.chossenResturants.products[index]; //order is important  first change the item from defult
   // console.log(this.chossenResturants['menu'][index]);
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
    this.navCtrl.push(OrderPage,{"orders":this.orders});
  }

}
