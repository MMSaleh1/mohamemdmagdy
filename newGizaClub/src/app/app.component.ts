import { Component,ViewChild } from '@angular/core';
import {Nav,Platform,ToastController } from 'ionic-angular';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import {NativeStorage} from '@ionic-native/native-storage';

import { HomePage } from '../pages/home/home';
import { AbouttabsPage } from '../pages/abouttabs/abouttabs';
import {RegestrationPage } from '../pages/regestration/regestration';
import { LoginPage } from '../pages/login/login';
import {ProfilePage} from '../pages/profile/profile';
import {MasterplanPage} from '../pages/masterplan/masterplan';
import {ResturantsPage} from '../pages/resturants/resturants';
import {InteractPage} from '../pages/interact/interact';
import{ FacilitieslistPage} from '../pages/facilitieslist/facilitieslist';
import{ SportslistPage} from '../pages/sportslist/sportslist'
import {CodeverificationPage} from '../pages/codeverification/codeverification';


declare var window :any;

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
    
   @ViewChild(Nav) nav: Nav;
   public defaultPage : string = "defaultPage";
  rootPage:any;
  pages: Array<{title: string, component: any}>;
  backButtonPressedOnceToExit=false;
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,private toastCtrl:   ToastController,private natStorage : NativeStorage) {
    //this.rootPage=RegestrationPage;
    this.natStorage.getItem(this.defaultPage).then((data)=>{
          if(data == RegestrationPage.name){
            this.rootPage=RegestrationPage;
          }else if(data== LoginPage.name){
            this.rootPage=LoginPage;
          }else if(data == CodeverificationPage.name){
            this.rootPage=CodeverificationPage;
          }else{
            this.rootPage=HomePage;
          }
          
      },(err)=>{
        this.natStorage.setItem(this.defaultPage,RegestrationPage.name);
        this.rootPage=HomePage;
        
      }
    )
   
    this.pages=[
      {title: "Home" ,component : HomePage},
      {title: 'resturants',component : ResturantsPage},
      {title: 'sports',component : SportslistPage},
      {title: 'facilities',component : FacilitieslistPage},
      {title: 'about us',component : AbouttabsPage },
      {title: 'ProfilePage',component : ProfilePage},
      {title: 'general plan',component : MasterplanPage},
      {title: 'interact', component : InteractPage},
      
      
    ],
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
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
