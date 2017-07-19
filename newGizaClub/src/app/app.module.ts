import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser'
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpModule } from '@angular/http';



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
import {SportsPage} from '../pages/sports/sports';
import {SportslistPage} from '../pages/sportslist/sportslist';
import {FacilitieslistPage} from '../pages/facilitieslist/facilitieslist';
import {PhilosophyPage} from '../pages/philosophy/philosophy';
import {VisionPage} from '../pages/vision/vision';
import {AbouttabsPage} from '../pages/abouttabs/abouttabs';
import {ResturantsPage} from '../pages/resturants/resturants';
import {InteractPage} from '../pages/interact/interact';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { SMS }from '@ionic-native/sms';
import { CameraPreview,CameraPreviewPictureOptions,CameraPreviewOptions,CameraPreviewDimensions } from '@ionic-native/camera-preview';
import { CashProvider } from '../providers/cash/cash';
import { NativeStorage }from '@ionic-native/native-storage';
import { UserProvider } from '../providers/user/user';
import { RootProvider } from '../providers/root/root';


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
    MasterplanPage,
    SportsPage,
    SportslistPage,
    FacilitieslistPage,
    PhilosophyPage,
    VisionPage,
    AbouttabsPage,
    ResturantsPage,
    InteractPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
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
    MasterplanPage,
    SportsPage,
    SportslistPage,
    FacilitieslistPage,
    PhilosophyPage,
    VisionPage,
    AbouttabsPage,
    ResturantsPage,
    InteractPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AndroidPermissions,
    SMS,
    CameraPreview,
    NativeStorage,
    CashProvider,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    CashProvider,
    UserProvider,
    RootProvider
  ]
})
export class AppModule {}
