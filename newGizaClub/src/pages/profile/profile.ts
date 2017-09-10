import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {NativeStorage} from '@ionic-native/native-storage';

import {User} from '../../templates/usertemplate';

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
  public user:User;
  private family:Array<User>;
  private relatives:Array<User>;
  constructor(public navCtrl: NavController, public navParams: NavParams,public natStorage:NativeStorage) {
    this.family=new Array();
    this.relatives=new Array();
    this.user=new User("mohammed",'20',"assets/img/profileTemp.png","false",'123456789','1000','1111111111111','mohammed@edge',0,null,1000);
  /*
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
  */
  this.natStorage.getItem("relatives").then(data=>{
    for(var i =0 ; i<data.length;i++){
      
      this.family=data;
      if(i>0){
        this.relatives[i-1]=this.family[i];
      }

      this.user=this.family[0];
    }
  },err=>{
        this.relatives[0]=this.user;
        this.relatives[0].Relation="child";
      this.relatives[1]=this.relatives[0];
      
  })
  
  

  }

  public changePassword(){
    this.navCtrl.setRoot(LoginPage);
  }

  ionViewDidLoad() {

  }


}
