import { Component } from '@angular/core';
import {NavController, NavParams } from 'ionic-angular';
import {NativeStorage} from '@ionic-native/native-storage';

import {ResturantsPage} from '../resturants/resturants';

import {ProductsProvider} from '../../providers/products/products';

import {Resturant , Product , Category} from '../../templates/resturantstemplate';
/**
 * Generated class for the ResturantslistPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-resturantslist',
  templateUrl: 'resturantslist.html',
})
export class ResturantslistPage {
  public name : string ="Resturants";
  public resturants : Array<any>;
  public products : Array<any>;
  public Ready : boolean =false;

  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     public natStorage : NativeStorage,
     public productsProvider :ProductsProvider
    ) {
      this.resturants = new Array();
      this.products = new Array();

      this.natStorage.getItem("POS").then(data=>{
        this.resturants = data;
        this.Ready=true;
      },err=>{
         //the following code is only for testing on browser and it doesn`t work in app 
      this.productsProvider.get_Pos().subscribe(pos=>{ // getting points of sale from the API
        if(pos.length >0){ // check if there is no POS
        
        this.productsProvider.get_products().subscribe(Data=>{ // get the products from API , to put each product in its POS
          if(Data.length > 0 ){// check if there is no product 
            let ProductArr = new Array(); // create array to store the products
           this.productsProvider.get_category().subscribe(data=>{
              if(data.length > 0){
              let categories = new Array();
              for(let i =0 ; i<data.length;i++){
                categories[i]= new Category(data[i].category_name,data[i].category_id);
              }
              for(let j = 0 ; j<Data.length ; j++){
                let flag = false;
                for(let i =0 ; i<categories.length;i++){
                  if(categories[i].id==Data[j].prod_category){
                    ProductArr[j] = new Product(Data[j].prod_name,Data[j].prod_image,Data[j].price,Data[j].prod_desc,Data[j].prod_id,Data[j].quantity,categories[i],Data[j].point_id); // add product to the product array
                   flag = true;
                    break;
                  }
                }
                if(flag == false){
                  ProductArr[j] = new Product(Data[j].prod_name,Data[j].prod_image,Data[j].price,Data[j].prod_desc,Data[j].prod_id,Data[j].quantity,new Category(),Data[j].point_id); // add product to the product array
                }
      
                
              
              }
              for(let i =0;i<pos.length;i++){ // itirate over the POS
                this.resturants[i] = new Resturant(pos[i].PointName,pos[i].PointID,pos[i].PointDesc,pos[i].PointLogo,[new Product()],pos[i].PointCategory);//add a POS to the array
                let counter = 0; // counter that points to  first empty postion in the products array for each POS
                for(let j=0 ; j<Data.length ; j++){ // itirate over the products
                  if(ProductArr[j].PosId == this.resturants[i].id ){ // check if the current product has he point of sale id as the current POS 
                    this.resturants[i].products[counter] = ProductArr[j];// if true => add the product to the array of products in the current POS
                    counter++; // move the counter to point to the next postion in the array
                    
                  }
                } 
              }
              console.log(categories);
              console.log(this.resturants);
              console.log(ProductArr);
              this.Ready=true;
              this.natStorage.setItem("POS",this.resturants);
            }
            
      
           },err=>{
             alert(err);
           })
            
            
          }
      
        },err=>{
          alert(err);
        })
        
        
      }else{
        alert("No Resturants");
      }
      },err=>{
        alert(err);
      });
      })



  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ResturantslistPage');
  }

  openPage(resturant : any){
    this.navCtrl.push(ResturantsPage,{"resturant" : resturant});

  }

}
