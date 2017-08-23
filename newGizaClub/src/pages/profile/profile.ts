import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {NativeStorage} from '@ionic-native/native-storage';

import {LoginPage} from '../login/login';
/**
 * Generated class for the ProfilePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
//@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  public name : string ="profile";
  public segment:any='info';
  public user:any={
    img : "assets/img/profileTemp.png",
    name: 'mohammed',
    id : '123456',
    rfid : '123456789',
    dob : '1 Nov 2017',
    nid : '1221432351556',
    mobileNum : '0199297597',
    memberId : '123456789',
    email : 'mohammed@edge.com',
    occupation : 'Academic Occupation',
    applicationNum : "1 Nov 2004",
    password : ""
  };
  constructor(public navCtrl: NavController, public navParams: NavParams,public natStorage:NativeStorage) {
  this.natStorage.getItem("user").then(data=>{
    this.user.memberId=data.memberId;
    this.user.email=data.email;
    this.user.mobile=data.mobile;
    this.user.dob=data.DOB;
    this.user.nid=data.nationalId;
    this.user.id=data.userID;
    this.user.password=data.password;

  },err=>{
    console.log(err);
  });
  }

  public changePassword(){
    this.navCtrl.setRoot(LoginPage);
  }

  ionViewDidLoad() {

  }


}
