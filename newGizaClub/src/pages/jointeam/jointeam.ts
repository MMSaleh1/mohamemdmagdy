import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import {SportsProvider} from '../../providers/sports/sports';

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
  public name :string = "Join The Team";
  public Sdetails : Array<string>;

  constructor(public navCtrl: NavController, public navParams: NavParams , public sportsProvider :SportsProvider) {
    this.team = this.navParams.get("team");
    this.member = this.navParams.get("member");
    this.Sdetails = new Array();
    console.log(this.team);
    console.log(this.member);
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
    this.sportsProvider.joinSport(this.team.sport.id,this.team.id,this.team.schedule.id,this.member.memberId,this.team.cost).subscribe(data=>{
      if(data == true){
        alert('You successfully Joind the team');
      }else{
        alert(data);
      }
    },err=>{
      alert(err);
    })
    console.log("joined");
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad JointeamPage');
  }

}
