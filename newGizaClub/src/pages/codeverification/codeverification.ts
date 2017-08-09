import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {SMS} from '@ionic-native/sms';

import {LoginPage} from '../login/login';
/**
 * Generated class for the CodeverificationPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-codeverification',
  templateUrl: 'codeverification.html',
})
export class CodeverificationPage {
  public name:string="verification";
  public code:any;
  private correctCode:any;
  constructor(public navCtrl: NavController,private sms : SMS, public navParams: NavParams) {
    this.correctCode='11111';
    //if(this.sms.hasPermission()){
      //this.sms.send('01099297597',this.correctCode);
   // }else{
    //  alert("we don`t have permission to send sms");
   // }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CodeverificationPage');
  }
  public sendCode(){
    console.log(this.code);
    if(this.code==this.correctCode){
       this.navCtrl.setRoot(LoginPage);
    }
  }

}
