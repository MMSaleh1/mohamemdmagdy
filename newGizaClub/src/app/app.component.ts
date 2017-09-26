import { Component,ViewChild } from '@angular/core';
import {Nav,Platform,ToastController } from 'ionic-angular';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {NativeStorage} from '@ionic-native/native-storage';

import { HomePage } from '../pages/home/home';
import { AbouttabsPage } from '../pages/abouttabs/abouttabs';
import { RegestrationPage } from '../pages/regestration/regestration';
import { LoginPage } from '../pages/login/login';
import { ProfilePage } from '../pages/profile/profile';
import { ResturantslistPage} from '../pages/resturantslist/resturantslist';
import { FacilitieslistPage } from '../pages/facilitieslist/facilitieslist';
import { SportslistPage } from '../pages/sportslist/sportslist'
import { CodeverificationPage } from '../pages/codeverification/codeverification';


import { ProductsProvider } from '../providers/products/products';
import { SportsProvider } from '../providers/sports/sports';
import { NewsProvider } from '../providers/news/news';  

import { Sports } from '../templates/sportstemplate';
import { Resturant,Category,Product } from '../templates/resturantstemplate';
import { News } from '../templates/usertemplate';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
    
  @ViewChild(Nav) nav: Nav;
   public defaultPage : string = "defaultPage";
  rootPage:any;
  pages: Array<{title: string, component: any}>;
  backButtonPressedOnceToExit=false;
  constructor(platform: Platform,
     statusBar: StatusBar,
      splashScreen: SplashScreen,
      private toastCtrl:   ToastController,
      private natStorage : NativeStorage,
      private productsProvider : ProductsProvider ,
      private sportsProvider : SportsProvider,
      private newsProvider : NewsProvider
    ) {
    //this.rootPage=RegestrationPage;
    
   
    this.pages=[
      {title: "Home" ,component : HomePage},
      {title: 'Resturants',component : ResturantslistPage},
      {title: 'Sports',component : SportslistPage},
      {title: 'Facilities',component : FacilitieslistPage},
      {title: 'About us',component : AbouttabsPage },
      {title: 'ProfilePage',component : ProfilePage},
     // {title: 'General plan',component : MasterplanPage},
     // {title: 'Interact', component : InteractPage},
      
      
    ],


    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      //Keyboard.disableScroll(true)
      

      this.natStorage.getItem(this.defaultPage).then((data)=>{
        if(data == HomePage.name){
          this.rootPage=HomePage;
        }else if(data== LoginPage.name){
          this.rootPage=LoginPage;
        }else if(data == CodeverificationPage.name){
          this.rootPage=CodeverificationPage;
        }else{
          this.rootPage=RegestrationPage;
        }
        
    },(err)=>{
      this.natStorage.setItem(this.defaultPage,RegestrationPage.name);
      this.rootPage=RegestrationPage;
    }
  )
      statusBar.styleDefault();
      this.nav.setRoot(this.rootPage).catch(err=>{
        console.log(err)});
      splashScreen.hide();
     
    
     let lastTimeBackPress = 0;
        let timePeriodToExit  = 2000;

        
              //calling APIs from the server to get the static data


              // the following code need to be inhanced this is just for trial and debuging
              //
              //
this.productsProvider.get_Pos().subscribe(pos=>{ // getting points of sale from the API
  if(pos.length >0){ // check if there is no POS
  let POSArr = new Array(); // create array to store the POS
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
          POSArr[i] = new Resturant(pos[i].PointName,pos[i].PointID,pos[i].PointDesc,pos[i].PointLogo,[new Product()],pos[i].PointCategory);//add a POS to the array
          let counter = 0; // counter that points to  first empty postion in the products array for each POS
          for(let j=0 ; j<Data.length ; j++){ // itirate over the products
            if(ProductArr[j].PosId == POSArr[i].id ){ // check if the current product has he point of sale id as the current POS 
              POSArr[i].products[counter] = ProductArr[j];// if true => add the product to the array of products in the current POS
              counter++; // move the counter to point to the next postion in the array
              
            }
          } 
        }
        console.log(categories);
        console.log(POSArr);
        console.log(ProductArr);
        this.natStorage.setItem("POS",POSArr);
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
this.sportsProvider.getSports().subscribe(data=>{
  if(data.length != 0){
  let sports= new Array();
  for(let i =0;i<data.length;i++){
    sports[i]=new Sports(data[i].SportName,data[i].SportID,data[i].SportDesc);
  }
  this.natStorage.setItem("sports",sports);
  }else{
    alert("NO Sports");
  }
},err=>{
})
this.productsProvider.get_category().subscribe(data=>{
  if(data.length >0){
  let categories = new Array();
  for(let i =0 ; i<data.length;i++){
    categories[i]= new Category(data[i].category_name,data[i].category_id);
  }
  this.natStorage.setItem("category",categories);
}
},err=>{
  alert(err);
});



this.natStorage.getItem('user').then(data=>{
  this.newsProvider.getnews(data.memberId).subscribe(news=>{
    if(news.length > 0){
      let tempNews :Array<News> = new Array();
      for(let i = 0 ;i<news.length;i++){
        tempNews[i]=new News(news[i].NewsID,news[i].NewsTitle,news[i].NewsContent,news[i].LikeCount,news[i].DisLikeCount,news[i].NewsImage);
      }
    this.natStorage.setItem("news",tempNews);
    
    }
  },err=>{
    alert(err);
  })
},err=>{
  console.log(err);
})











//----------------------------------------------------------------

/*
        platform.registerBackButtonAction(() => {
            // get current active page
            let view = this.nav.getActive();
            if (view.component.name == "HomePage") {
                //Double check to exit app
                if (new Date().getTime() - lastTimeBackPress < timePeriodToExit) {
                    platform.exitApp(); //Exit from app
                   // window.plugins.appMinimize.minimize();
                } else {
                    let toast = this.toastCtrl.create({
                        message:  'Press back again to exit App.',
                        duration: 3000,
                        position: 'bottom'
                    });
                    toast.present();
                    lastTimeBackPress = new Date().getTime();
                }
            } else if(view.component.name != "HomePage" && view.component.name != "CodeverificationPage" && view.component.name !="LoginPage" && view.component.name !="RegestrationPage"){
              this.rootPage=HomePage;
              this.nav.goToRoot({});
            }
              else {
                // go to previous page
                this.nav.pop({});
            }
        });
        */
    });
    

  }
  /*
  showToast() {
        let toast = this.toastCtrl.create({
          message: 'Press Again to exit',
          duration: 2000,
          position: 'bottom'
        });

        toast.onDidDismiss(() => {
          
        });

        toast.present();
      }
*/
  openPage(page :any) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component).then(data=>{
    console.log(data);
    console.log(this.nav.getActive().name);
    });
    
  }
  
  
}
