import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {NativeStorage} from '@ionic-native/native-storage';

import {User,Balance} from '../../templates/usertemplate';
import {UserProvider} from '../../providers/user/user';
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
  public relativesReady:boolean=false;
  public hestoryBalanceReady:boolean =false;

  public balanceHestory :Array<Balance>;

  constructor(public navCtrl: NavController, public navParams: NavParams,public natStorage:NativeStorage,public userProvider :UserProvider) {
    this.family=new Array();
    this.relatives=new Array();
    this.balanceHestory = new Array();
    this.user=new User("mohammed",'20',"assets/img/profileTemp.png","false",'3147','1000','1111111111111','mohammed@edge',1,null,1000);
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
        this.relatives[i-1]=this.family[i]; // get the  relative from the family array
      }

     
    }
    this.user=this.family[0]; // the user is always the first element
    this.relativesReady=true;
    this.userProvider.get_user_balance_history(this.user.memberId).subscribe(data=>{
      if(data.length > 0){
      this.user.balanceMoney=data[0].Balance;
      this.family[0].balanceMoney=data[0].Balance;
      //this.relatives[0].balanceMoney=data[0].Balance;
      this.natStorage.setItem("relatives",this.family);
      for(var i = 0;i<data.length;i++){
        this.balanceHestory[i]= new Balance(data[i].amount,data[i].Balance,data[i].trans_date,data[i].item_name);
      }
      this.hestoryBalanceReady=true;
    }
    },err=>{
      alert(err);
    })
    
  },err=>{
        this.relatives[0]=this.user;
        this.relatives[0].Relation="child";
      this.relatives[1]=this.relatives[0];
      this.relativesReady=true;
      this.userProvider.get_user_balance_history(this.user.memberId).subscribe(data=>{
        if(data.length > 0){
          this.balanceHestory = new Array();
        this.user.balanceMoney=data[0].Balance;
        //this.family[0].balanceMoney=data[0].Balance;
        this.relatives[0].balanceMoney=data[0].Balance;
        this.natStorage.setItem("relatives",this.family);
        for(var i = 0;i<data.length;i++){
          this.balanceHestory[i]= new Balance(data[i].amount,data[i].Balance,data[i].trans_date,data[i].item_name);
        }
        this.hestoryBalanceReady=true;
      }
      },err=>{
        alert(err);
      })
      
  })
  if(this.relativesReady == true){
    this.userProvider.get_user_balance_history(this.user.memberId).subscribe(data=>{
      if(data.length > 0){
      this.user.balanceMoney=data[0].Balance;
      this.family[0].balanceMoney=data[0].Balance;
      this.natStorage.setItem("relatives",this.family);
      for(var i = 0;i<data.length;i++){
        this.balanceHestory[i].amount=data[i].amount;
        this.balanceHestory[i].balance=data[i].Balance;
        this.balanceHestory[i].transactionDate=data[i].trans_date;
        this.balanceHestory[i].transactionType=data[i].item_name;
      }
      this.hestoryBalanceReady=true;
    }
    },err=>{
      alert(err);
    })
  }
  

  }

  public changePassword(){
    this.navCtrl.setRoot(LoginPage);
  }

  ionViewDidLoad() {

  }


}
