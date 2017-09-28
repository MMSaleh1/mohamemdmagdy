import { Component } from '@angular/core';
import {NavController, NavParams } from 'ionic-angular';
import {NativeStorage} from '@ionic-native/native-storage';

import {SportsProvider} from '../../providers/sports/sports';
import {UserProvider} from '../../providers/user/user';
 import {User} from '../../templates/usertemplate';
/**
 * Generated class for the JointeamPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-jointeam',
  templateUrl: 'jointeam.html',
})
export class JointeamPage {
  public team : any;
  public member : any ;
  public user : any;
  public name :string = "Join The Team";
  public Sdetails : Array<string>;
  public userReady : boolean = false;
  public paymentUser : any; // this indecates which user will pay to join

  constructor(public navCtrl: NavController,
     public navParams: NavParams,
      public sportsProvider :SportsProvider,
      public natStorage : NativeStorage,
      public userProvider : UserProvider
    ) {
    this.team = this.navParams.get("team");
    this.member = this.navParams.get("member");
    this.Sdetails = new Array();
    console.log(this.team);
    console.log(this.member);
    this.natStorage.getItem('user').then(data=>{
      this.user = data;
      this.userReady=true;
      this.paymentUser=this.user;
    },err=>{
      console.log(err);
      this.paymentUser=this.member;
      this.user = this.user=new User("magdy",'20',"assets/img/profileTemp.png","false",'2923','1000','01099297597','mohammed.magdy.ali.96@gmail.com@edge',0,null,50);
      //this.user.username="Ramy";
      this.userReady=true;
    })
    let L_limit=-1;
    //let H_limit=0;
    let counter =0;
    let details : string = this.team.schedule.details;
    for(var i =0;i<=details.length+1;i++)
      {
        if(i > details.length){
          this.Sdetails[counter] = details.substring(L_limit+1,i-1);
          L_limit = i;
        counter++;   
        }else if(details.charAt(i) ==','){
          this.Sdetails[counter] = details.substring(L_limit+1,i);
          L_limit = i;
        counter++;        
      }
      }
      console.log(this.Sdetails);
      
      
  }
  public join(){
    console.log(this.paymentUser.memberId);
    this.userProvider.get_user_balance_history(this.paymentUser.memberId).subscribe(data=>{
      if(data.length > 0){
      this.paymentUser.balanceMoney=data[0].Balance;
      if(this.paymentUser.balanceMoney >= this.team.cost){
        this.sportsProvider.joinSport(this.team.sport.id,this.team.id,this.team.schedule.id,this.paymentUser.memberId,this.team.cost).subscribe(data=>{
          if(data == true){
            alert('You successfully Joind the team');
          }else{
            alert(data);
          }
        },err=>{
          alert(err);
        })
      }else{
        alert("Not Enough Money");
      }
    }else{
      alert("Not Enough Money");
    }

    },err=>{
      alert(err);
    })
    
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad JointeamPage');
  }
  

}
