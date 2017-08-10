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
      this.correctCode=this.navParams.get("code");
      this.sendSms();
    console.log(this.userdata);
  }

  
  public sendCode(){
    console.log(this.code);
    if(this.code==this.correctCode){
      this.user.confirm_via_email_and_memberid(this.userdata.mobile,this.userdata.membershipID).subscribe((data)=>{
        this.userdata.DOB= new Date(data[0].DOB);
        this.userdata.image=data[0].image;
        this.userdata.membershipType=data[0].membershipType;
        this.userdata.gender=data[0].gender;
        this.userdata.nationalId=data[0].nationalID;
        this.userdata.userID=data[0].userID;
         this.navCtrl.setRoot(LoginPage,{"user":this.userdata});
      },(err)=>{
        alert("connection error,please try again");
      })
      
    }
  }
  public requestCode(){
    this.user.regester_datatable(this.userdata.mobile).subscribe((data)=>{
      this.correctCode=data[0].code;
      console.log(this.correctCode);
      this.sendSms();
      alert(this.correctCode);
    },(err)=>{
      alert("connection error,please try again");
    });
  }
  private sendSms(){
    if(this.sms.hasPermission()){
      this.sms.send(this.userdata.mobile,this.correctCode);
    }else{
      alert("we don`t have permission to send sms");
    }
  }
ionViewDidLoad() {
    console.log('ionViewDidLoad CodeverificationPage');
  }
}
