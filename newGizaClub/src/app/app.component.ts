import { Component,ViewChild } from '@angular/core';
import {Nav,Platform,ToastController } from 'ionic-angular';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import {NativeStorage} from '@ionic-native/native-storage';

import { HomePage } from '../pages/home/home';
import { AbouttabsPage } from '../pages/abouttabs/abouttabs';
import { RegestrationPage } from '../pages/regestration/regestration';
import { LoginPage } from '../pages/login/login';
import { ProfilePage } from '../pages/profile/profile';
import { MasterplanPage } from '../pages/masterplan/masterplan';
import { ResturantsPage } from '../pages/resturants/resturants';
import { InteractPage } from '../pages/interact/interact';
import { FacilitieslistPage } from '../pages/facilitieslist/facilitieslist';
import { SportslistPage } from '../pages/sportslist/sportslist'
import { CodeverificationPage } from '../pages/codeverification/codeverification';


import { ProductsProvider } from '../providers/products/products';

import {Resturant,Category,Product} from '../templates/resturantstemplate';


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
      private productsProvider : ProductsProvider 
    ) {
    //this.rootPage=RegestrationPage;
    
   
    this.pages=[
      {title: "Home" ,component : HomePage},
      {title: 'Resturants',component : ResturantsPage},
      {title: 'Sports',component : SportslistPage},
      {title: 'Facilities',component : FacilitieslistPage},
      {title: 'About us',component : AbouttabsPage },
      {title: 'ProfilePage',component : ProfilePage},
      {title: 'General plan',component : MasterplanPage},
      {title: 'Interact', component : InteractPage},
      
      
    ],


    platform.ready().then(() => {
      //calling APIs from the server to get the static data


this.productsProvider.get_Pos().subscribe(prod=>{ // getting points of sale from the API
  if(prod.length >0){ // check if there is no POS
  let POSArr = new Array(); // create array to store the POS
  POSArr.length = prod.length; // init the array length
  this.productsProvider.get_products().subscribe(Data=>{ // get the products from API , to put each product in its POS
    if(Data.length > 0 ){// check if there is no product 
      let ProductArr = new Array(); // create array to store the products
      ProductArr.length=Data.length;// init the array length
      for(var i =0;i<prod.length;i++){ // itirate over the POS
        POSArr[i] = new Resturant(prod[i].PointName,prod[i].PointID,prod[i].PointDesc,prod[i].PointLogo,[new Product()],prod[i].PointCategory);//add a POS to the array
        let counter = 0; // counter that points to  first empty postion in the products array for each POS
        for(var j=0 ; j<Data.length ; j++){ // itirate over the products
          ProductArr[j] = new Product(Data[j].prod_name,Data[j].prod_image,Data[j].price,Data[j].prod_desc,Data[j].prod_id,Data[j].quantity,Data[j].prod_category,Data[j].point_id); // add product to the product array
          if(ProductArr[j].PosId == POSArr[i].id ){ // check if the current product has he point of sale id as the current POS 
            POSArr[i].products[counter] = ProductArr[j];// if true => add the product to the array of products in the current POS
            counter++; // move the counter to point to the next postion in the array
            
          }
        } 
      }
      this.natStorage.setItem("POS",POSArr);
      this.natStorage.setItem("products",ProductArr);
      console.log(POSArr);
      console.log(ProductArr);
    }

  })
  
  
}else{
  alert("No Resturants");
}
},err=>{
  alert(err);
});
this.productsProvider.get_category().subscribe(data=>{
  this.natStorage.setItem("category",data);
console.log(data);
});









//----------------------------------------------------------------



      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
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
      this.nav.setRoot(this.rootPage);
      splashScreen.hide();
     
    
     var lastTimeBackPress = 0;
        var timePeriodToExit  = 2000;

        platform.registerBackButtonAction(() => {
            // get current active page
            let view = this.nav.getActive();
            if (view.component.name == "HomePage" &&!this.nav.canGoBack()) {
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
    });
    

  }
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

  openPage(page :any) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
  
  
}
