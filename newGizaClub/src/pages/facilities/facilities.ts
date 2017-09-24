import { Component } from '@angular/core';
import {NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the FacilitiesPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-facilities',
  templateUrl: 'facilities.html',
})
export class FacilitiesPage {
  public name ='';
  public facility :any ;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.facility =this.navParams.get("facility");
    this.name=this.facility.title;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FacilitiesPage');
  }

}
