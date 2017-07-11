import { Component,ViewChild } from '@angular/core';
import {Nav,Platform,ToastController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { AbouttabsPage } from '../pages/abouttabs/abouttabs';
import {RegestrationPage } from '../pages/regestration/regestration';
import { LoginPage } from '../pages/login/login';
import {ProfilePage} from '../pages/profile/profile';
import {MasterplanPage} from '../pages/masterplan/masterplan';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  
   @ViewChild(Nav) nav: Nav;
  rootPage:any;
  pages: Array<{title: string, component: any}>;
  backButtonPressedOnceToExit=false;
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,private toastCtrl:   ToastController) {
    this.rootPage=HomePage;
    this.pages=[
      {title: "Home" ,component : HomePage},
      {title: 'about us',component : AbouttabsPage },
      {title: 'RegestrationPage' ,component :RegestrationPage},
      {title: 'LoginPage' ,component : LoginPage},
      {title: 'ProfilePage',component : ProfilePage},
      {title: 'general plan',component : MasterplanPage}
      
    ]
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
            if (view.component.name == "HomePage") {
                //Double check to exit app
                if (new Date().getTime() - lastTimeBackPress < timePeriodToExit) {
                    platform.exitApp(); //Exit from app
                } else {
                    let toast = this.toastCtrl.create({
                        message:  'Press back again to exit App?',
                        duration: 3000,
                        position: 'bottom'
                    });
                    toast.present();
                    lastTimeBackPress = new Date().getTime();
                }
            } else {
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
          console.log('Dismissed toast');
        });

        toast.present();
      }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
  
  
}
