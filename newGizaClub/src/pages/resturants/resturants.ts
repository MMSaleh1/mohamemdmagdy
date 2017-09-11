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
  }>;
  public ready : boolean[]=[false,false,false];
  //ready[0] check the POS
  //ready[1] check the products
  //ready[2] check the categories
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
    private choosenResturant :Resturant;

  constructor(public navCtrl: NavController, public navParams: NavParams,public ProdProvider:ProductsProvider,public natStorage : NativeStorage) {
    this.resturants = [new Resturant()];
    this.products = [new Product()];
    this.categories = [new Category()];
    this.choosenResturant = new Resturant();
     this.natStorage.getItem("POS").then(data=>{
       if(data.length>0){
       for(var i = 0 ; i< data.length ;i++){
         this.resturants[i]=data[i];
       }
       if(this.navParams.get('resturant')){
        this.changeResturant(this.navParams.get('resturant'));
      }else{
          this.changeResturant(this.resturants[0]);
      }
      this.ready[0]=true;
    }else{
      alert("No Resturnts");
    }
     },err=>{
      this.ProdProvider.get_Pos().subscribe(prod=>{ // getting points of sale from the API
        if(prod.length >0){ // check if there is no POS
        this.resturants.length = prod.length; // init the array length

        this.ProdProvider.get_products().subscribe(Data=>{ // get the products from API , to put each product in its POS

          if(Data.length > 0 ){// check if there is no product 
            
            this.products.length=Data.length;// init the array length
            for(var i =0;i<prod.length;i++){ // itirate over the POS
              this.resturants[i] = new Resturant(prod[i].PointName,prod[i].PointID,prod[i].PointDesc,prod[i].PointLogo,[new Product()],prod[i].PointCategory);//add a POS to the array
              let counter = 0; // counter that points to  first empty postion in the products array for each POS
              for(var j=0 ; j<Data.length ; j++){ // itirate over the products
                this.products[j] = new Product(Data[j].prod_name,Data[j].prod_image,Data[j].price,Data[j].prod_desc,Data[j].prod_id,Data[j].quantity,Data[j].prod_category,Data[j].point_id); // add product to the product array
                if(this.products[j].PosId == this.resturants[i].id ){ // check if the current product has he point of sale id as the current POS 
                  this.resturants[i].products[counter] = this.products[j];// if true => add the product to the array of products in the current POS
                  counter++; // move the counter to point to the next postion in the array
                  
                }
              }
              
              
            }
            if(this.navParams.get('resturant')){
              this.changeResturant(this.navParams.get('resturant'));
            }else{
                this.changeResturant(this.resturants[0]);
            }
            //this.choosenResturant=this.resturants[0];
            this.ready[0]=true;
            this.natStorage.setItem("POS",this.resturants);
            this.natStorage.setItem("products",this.products);
            console.log(this.choosenResturant);
            console.log(this.products);

          }
      
        })
        
        
      }else{
        alert("No Resturants");
      }
      },err=>{
        alert("No Resturants");
      })
      })
     console.log(this.resturants);
      this.ProdProvider.get_category().subscribe(data=>{
        if(data.length > 0){
          this.categories.length = data.length;
          for(var i =0 ; i < data.length;i++){
            let temp = new Category(data[i].category_name,data[i].category_id);
            this.categories[i] = temp ;
            
          }
        }
        this
        console.log(data);
      },err=>{
        console.log(err);
      });
      

 
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
    this.choosenResturant = resturant;
    this.orders= new Array();
    this.orders.length=this.choosenResturant.products.length;
    this.orders.fill({item: new Product(), quantity :0});
    for(var i =0;i<this.orders.length;i++){
      let temp :any ={item :this.choosenResturant.products[i],quantity:0 }
      this.orders[i]=temp;
      //console.log(this.orders[i]);
    }
    if(this.choosenResturant.products[0].id != '-1'){
      this.ready[1]=true
    }else{
      this.ready[1]=false;
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
  

}
