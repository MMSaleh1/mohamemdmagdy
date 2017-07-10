import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NotificationsPage} from '../notifications/notifications';

/**
 * Generated class for the SportsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
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
  open(){
    this.navCtrl.push( NotificationsPage,{
      sport : this.sport
    });
  }

}
