import { Component } from '@angular/core';
import {SMS} from '@ionic-native/sms';
import {MenuController}from'ionic-angular';
;
import {InteractPage} from '../interact/interact';

import {NewsPage} from '../news/news';
import {MainPage} from '../main/main';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
   public interact= InteractPage;
   public news= NewsPage;
   public main=MainPage
   public name:string="Home";

  constructor (private sms :SMS,private menu:MenuController) {
    this.menu.swipeEnable(true);
    
  }

}
