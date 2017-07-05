import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { LandingPage} from '../pages/landing/landing';
import { RegestrationPage }from '../pages/regestration/regestration';
import { LoginPage } from '../pages/login/login';
import {ForgetpwPage} from '../pages/forgetpw/forgetpw';
import {EventPage} from '../pages/event/event';
import {NotificationsPage} from '../pages/notifications/notifications';
import {AllEventsPage} from '../pages/allevents/allevents';
import {ProfilePage} from '../pages/profile/profile';
import {NotificationtabPage} from '../pages/notificationtab/notificationtab';
import {MasterplanPage} from '../pages/masterplan/masterplan';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    LandingPage,
    RegestrationPage,
    LoginPage,
    ForgetpwPage,
    EventPage,
    NotificationsPage,
    AllEventsPage,
    NotificationtabPage,
    ProfilePage,
    MasterplanPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    LandingPage,
    RegestrationPage,
    LoginPage,
    ForgetpwPage,
    EventPage,
    NotificationsPage,
    AllEventsPage,
    NotificationtabPage,
    ProfilePage,
    MasterplanPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
