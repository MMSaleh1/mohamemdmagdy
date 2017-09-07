import { Component } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';

import { NotificationsPage} from '../notifications/notifications';
import { SportsRegestrationPage } from '../sports-regestration/sports-regestration';


/**
 * Generated class for the SportsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-sports',
  templateUrl: 'sports.html',
})
export class SportsPage {
  public sport :any ;
  
  constructor(public navCtrl: NavController, public navParams: NavParams) {
      this.sport =navParams.get("sport");
      
    
      }

  ionViewDidLoad() {
    
  }
  open(pageName : string){
    if(pageName == "notification"){
    this.navCtrl.push( NotificationsPage,{
      sport : this.sport
    });
  }else if(pageName == "sportRegesteration")
  {
    this.navCtrl.push(SportsRegestrationPage,{"sport":this.sport});
  }
  }


}
