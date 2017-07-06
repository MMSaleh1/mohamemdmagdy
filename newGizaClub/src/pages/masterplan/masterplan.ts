import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {PhotoViewer } from '@ionic-native/photo-viewer';

/**
 * Generated class for the MasterplanPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-masterplan',
  templateUrl: 'masterplan.html',
})
export class MasterplanPage {
  private imgSrc ="../../assets/img/masterplan.jpg";
  constructor(public navCtrl: NavController, public navParams: NavParams,private photoViewer : PhotoViewer) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MasterplanPage');
  }
private zoom(){
  this.photoViewer.show(this.imgSrc);
}

}
