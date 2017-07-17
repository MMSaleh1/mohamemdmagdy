import { Component } from '@angular/core';

import {SMS} from '@ionic-native/sms';

import{ FacilitieslistPage} from '../facilitieslist/facilitieslist';
import{ SportslistPage} from '../sportslist/sportslist';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
   public facilities= FacilitieslistPage;
   public sports= SportslistPage;

  constructor (private sms :SMS) {
    
    //if(this.sms.hasPermission()){
      //this.sms.send('01099297597','this is a test massage');
    //  alert("we have permission to send sms");
   // }else{
    //  alert("we don`t have permission to send sms");
   // }
  }

}
