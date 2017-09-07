import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {NativeStorage} from '@ionic-native/native-storage';


import {SportslistPage}from '../sportslist/sportslist';
import {SportsPage} from '../sports/sports';
import {ResturantsPage} from '../resturants/resturants';

import { SportsProvider } from '../../providers/sports/sports';
import { ProductsProvider } from '../../providers/products/products';

import { Sports } from '../../templates/sportstemplate';
import {Resturant ,Product} from '../../templates/resturantstemplate';





/**
 * Generated class for the MainPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-main',
  templateUrl: 'main.html',
})
export class MainPage {
 public posReady: boolean=false;
 public sportsReady: boolean=false;
 public name : string ="Home";
 public Notifications : Array<{
    title : string , 
    time  : any,
    description : string,
    isNew : boolean
  }>;
  private resturants :Array<Resturant>;
/*
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
  */
  public sports : Array<any>;
  /*
    public sports : Array<{
    title : string,
    imageUrl : string,
    description : string
  }>
  */
  ;


  constructor(public navCtrl: NavController,
    public navParams : NavParams, 
    public natStorage : NativeStorage,
    public productsProvider :ProductsProvider,
    public sportsProvider :SportsProvider) {
    this.resturants = new Array();
    this.natStorage.getItem("POS").then(data=>{
      if(data.length>0){
      this.resturants.length= data.length;
    for (var i = 0; i < data.length; i++) {
      this.resturants[i]= data[i];
    }
    this.posReady=true;
  }else{
    alert("No Resturants");
  }
    },err=>{
      this.productsProvider.get_Pos().subscribe(prod=>{ // getting points of sale from the API
        if(prod.length >0){ // check if there is no POS
        this.resturants.length = prod.length; // init the array length

        this.productsProvider.get_products().subscribe(Data=>{ // get the products from API , to put each product in its POS

          if(Data.length > 0 ){// check if there is no product 
            let POSArr = new Array(); // create array to store the POS
            POSArr.length = Data.length; // init the array length
            for(var i =0;i<prod.length;i++){ // itirate over the POS
              this.resturants[i] = new Resturant(prod[i].PointName,prod[i].PointID,prod[i].PointDesc,prod[i].PointLogo,[new Product()],prod[i].PointCategory);//add a POS to the array
              let counter = 0; // counter that points to  first empty postion in the products array for each POS
              for(var j=0 ; j<Data.length ; j++){ // itirate over the products
                POSArr[j] = new Product(Data[j].prod_name,Data[j].prod_image,Data[j].price,Data[j].prod_desc,Data[j].prod_id,Data[j].quantity,Data[j].prod_category,Data[j].point_id); // add product to the product array
                if(POSArr[j].PosId == this.resturants[i].id ){ // check if the current product has he point of sale id as the current POS 
                  this.resturants[i].products[counter] = POSArr[j];// if true => add the product to the array of products in the current POS
                  counter++; // move the counter to point to the next postion in the array
                  
                }
              } 
            }
            this.natStorage.setItem("POS",this.resturants);
            this.natStorage.setItem("products",POSArr);
            this.posReady=true;
          }
      
        })
        
        
      }else{
        alert("No Resturants");
      }
      },err=>{
        alert("No Resturants");
      })

    });
    

    this.natStorage.getItem("sports").then(data=>{
      this.sports = data;
    },err=>{
      this.sportsProvider.getSports().subscribe(data=>{
        if(data.length != 0){
         this.sports= new Array();
        for(var i =0;i<data.length;i++){
          this.sports[i]=new Sports(data[i].SportName,data[i].SportID,data[i].SportDesc);
        }
        this.sportsReady=true;
        this.natStorage.setItem("sprots",this.sports);
        }else{
          alert("NO Sports");
        }
      },err=>{
        console.log(err);
      })
    })


    
    
    
    
    
    
    
    
    
    
    
    this.Notifications=[
      {
        title : "FirstNotif",
        time: '10:40',
        description :'this is the first notification testing notification formating',
        isNew : true
      },
      {
        title : "SecondNotif",
        time: '11:15',
        description :'this is the Second notification testing notification formating',
        isNew : true
      }
    ];

  }
  openNotifcation(){
    console.log("notification opened");
  }
  
  goToEvent(event : any){
    this.navCtrl.push(SportsPage,{
      "sport" : event
   });
  }
  goToNotifications(){
   // this.navCtrl.push(NotificationtabPage);
  }
  goToEvents(){
    this.navCtrl.push(SportslistPage);
  }

  goToRestaurant(slide :any){
    this.navCtrl.push(ResturantsPage,{"resturant":slide});
    console.log(slide);
  }

}
