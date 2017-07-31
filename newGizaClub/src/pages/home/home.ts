import { Component } from '@angular/core';
import {SMS} from '@ionic-native/sms';
import {NavController} from 'ionic-angular';
import{ FacilitieslistPage} from '../facilitieslist/facilitieslist';
import{ SportslistPage} from '../sportslist/sportslist';
import {InteractPage} from '../interact/interact';
import {ResturantsPage} from '../resturants/resturants';
import {NewsPage} from '../news/news';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
   public facilities= FacilitieslistPage;
   public sports= SportslistPage;
   public interact= InteractPage;
   public resturants=ResturantsPage;
   public news= NewsPage;

  constructor (private sms :SMS ,private navCtrl : NavController) {
    //if(this.sms.hasPermission()){
      //this.sms.send('01099297597','this is a test massage');
    //  alert("we have permission to send sms");
   // }else{
    //  alert("we don`t have permission to send sms");
   // }
  }

}
