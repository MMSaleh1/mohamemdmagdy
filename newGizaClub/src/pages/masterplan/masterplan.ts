import { Component } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';


/**
 * Generated class for the MasterplanPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-masterplan',
  templateUrl: 'masterplan.html',
})
export class MasterplanPage {
  public name : string ="Our Map";
  //private imgSrc ="../../assets/img/masterplan.jpg";
  constructor(public navCtrl: NavController, public navParams: NavParams) {

  }

  ionViewDidLoad() {
 
  }
 public zoom(){
  
}

}
