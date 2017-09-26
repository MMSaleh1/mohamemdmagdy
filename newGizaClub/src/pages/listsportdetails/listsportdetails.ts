import { Component } from '@angular/core';
import {NavController, NavParams } from 'ionic-angular';

import {JointeamPage} from '../jointeam/jointeam';

import {Coach,Schedule,Team} from '../../templates/sportstemplate';

import {SportsProvider} from '../../providers/sports/sports';

/**
 * Generated class for the ListsportdetailsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-listsportdetails',
  templateUrl: 'listsportdetails.html',
})
export class ListsportdetailsPage {
  public sport : any;
  public member : any;
  public name : string ="";
  public allTeams : Array<Team>;
  public fitTeams : Array<Team>; // teams that fit the user`s data (age , gender...etc)

  public ready :boolean =false;
  constructor(public navCtrl: NavController, public navParams: NavParams,public sportsProvider : SportsProvider) {
    this.sport = navParams.get("sport");
    this.member = navParams.get("member");
    this.name = this.sport.name + " Teams";
    this.allTeams = new Array();
    this.fitTeams = new Array();
    this.sportsProvider.getSportsDetails(this.sport.id).subscribe(data=>{
      
      if(data.length > 0 ){
        for(let i = 0;i<data.length ; i++){
          let tempCoach :Coach = new Coach(data[i].CoachName,data[i].CoachID,data[i].CoachBIO,data[i].CoachImage);
          let tempSchedule :Schedule = new Schedule(data[i].ScheduleName,data[i].ScheduleID,data[i].ScheduleDetail);
          this.allTeams[i]=new Team(data[i].TeamName,data[i].TeamID,data[i].TeamCost,data[i].BillingPeriod,data[i].Gender,data[i].TeamAge,tempSchedule,tempCoach,this.sport);
        }
        let counter = 0;
        for(let i = 0 ; i <this.allTeams.length ; i++){
          
          if(this.allTeams[i].gender == this.member.gender && this.allTeams[i].age == this.member.dob){
            this.fitTeams[counter] = this.allTeams[i];
            counter++;
          }
        }
        this.ready=true;
        console.log(this.allTeams);
        console.log(this.fitTeams);
      }else{
      }
    },err=>{
      alert(err);
    })

  }

  public join(team : any){
    this.navCtrl.push(JointeamPage,{'team' : team , 'member' : this.member});
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ListsportdetailsPage');
  }

}
