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
import {NewsPage} from '../pages/news/news';
import {CodeverificationPage} from '../pages/codeverification/codeverification';
import {MainPage} from '../pages/main/main';
import {OrderPage} from '../pages/order/order';
import {SportsRegestrationPage} from '../pages/sports-regestration/sports-regestration';
import {ListsportdetailsPage} from '../pages/listsportdetails/listsportdetails';
import {JointeamPage} from '../pages/jointeam/jointeam';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { SMS }from '@ionic-native/sms';
import { CameraPreview,CameraPreviewPictureOptions,CameraPreviewOptions,CameraPreviewDimensions } from '@ionic-native/camera-preview';
import { Base64ToGallery } from '@ionic-native/base64-to-gallery';
import { Camera } from '@ionic-native/camera';
import { File } from '@ionic-native/file';
import { FilePath} from '@ionic-native/file-path';
import {Transfer} from '@ionic-native/transfer';


import { CacheProvider } from '../providers/cache/cache';
import { NativeStorage }from '@ionic-native/native-storage';
import { UserProvider } from '../providers/user/user';
import { RootProvider } from '../providers/root/root';
import { HeaderComponent } from '../components/header/header';
import { ImagerecognitionProvider } from '../providers/imagerecognition/imagerecognition';
import { ProductsProvider } from '../providers/products/products';
import { SportsProvider } from '../providers/sports/sports';
import { NewsProvider } from '../providers/news/news';


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
    InteractPage,
    NewsPage,
    CodeverificationPage,
    HeaderComponent,
    MainPage,
    OrderPage,
    SportsRegestrationPage,
    ListsportdetailsPage,
    JointeamPage
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
    InteractPage,
    CodeverificationPage,
    NewsPage,
    MainPage,
    OrderPage,
    SportsRegestrationPage,
    ListsportdetailsPage,
    JointeamPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AndroidPermissions,
    SMS,
    CameraPreview,
    Camera,
    NativeStorage,
    Base64ToGallery,
    CacheProvider,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    CacheProvider,
    UserProvider,
    RootProvider,
    File,
    FilePath,
    Transfer,
    ImagerecognitionProvider,
    ProductsProvider,
    SportsProvider,
    NewsProvider
  ]
})
export class AppModule {}
