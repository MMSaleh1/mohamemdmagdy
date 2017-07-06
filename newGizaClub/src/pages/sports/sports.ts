import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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
      console.log(this.sport);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SportsPage');
  }

}
