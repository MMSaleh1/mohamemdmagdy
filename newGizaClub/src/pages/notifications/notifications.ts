import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the NotificationsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-notifications',
  templateUrl: 'notifications.html',
})
export class NotificationsPage {
  private sport : any;
  public name : string = "notifications";
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.sport = navParams.get('sport');
  }

  ionViewDidLoad() {
    
  }

}
