import { Component,ViewChild } from '@angular/core';
import {Nav,Platform } from 'ionic-angular';
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
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
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
    });
  }
  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
  
  
}
