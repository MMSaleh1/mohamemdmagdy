import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {SMS} from '@ionic-native/sms';

import {UserProvider} from '../../providers/user/user';
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
  private userdata:any;

  constructor(public navCtrl: NavController,
    private sms : SMS,
    public navParams: NavParams,
    public user: UserProvider
  ) {
      this.userdata=this.navParams.get("user");
    
    console.log(this.userdata);
    this.correctCode='11111';
    //if(this.sms.hasPermission()){
      //this.sms.send('01099297597',this.correctCode);
   // }else{
    //  alert("we don`t have permission to send sms");
   // }
  }

  
  public sendCode(){
    console.log(this.code);
    if(this.code==this.correctCode){
       this.navCtrl.setRoot(LoginPage,{"user":this.userdata});
    }
  }
  public requestCode(){
    this.user.regester(this.userdata[0].mobileNum).subscribe((data)=>{
      this.code=data;
    });
  }
ionViewDidLoad() {
    console.log('ionViewDidLoad CodeverificationPage');
  }
}
