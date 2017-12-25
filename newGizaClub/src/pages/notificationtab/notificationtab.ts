import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {NotificationsPage} from '../notifications/notifications';
import {HomePage} from '../home/home';

/**
 * Generated class for the NotificationtabPage tabs.
 *
 * See https://angular.io/docs/ts/latest/guide/dependency-injection.html for
 * more info on providers and Angular DI.
 */
@Component({
  selector: 'page-notificationtab',
  templateUrl: 'notificationtab.html'
})
//@IonicPage()
export class NotificationtabPage {
  public root1 = NotificationsPage;
  public root2 = HomePage;



  constructor(public navCtrl: NavController) {}

}
