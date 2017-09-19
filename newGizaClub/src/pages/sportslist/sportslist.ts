import { Component } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';
import {NativeStorage} from '@ionic-native/native-storage';


import { SportsProvider } from '../../providers/sports/sports';

import { Sports } from '../../templates/sportstemplate';

import {SportsPage} from '../sports/sports';
/**
 * Generated class for the SportslistPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-sportslist',
  templateUrl: 'sportslist.html',
})
export class SportslistPage {
  public sportsReady : boolean =false;
  public name :string ='Sports';
  public sports : Array<any>;
  constructor(public navCtrl: NavController, public navParams: NavParams,public sportsProvider : SportsProvider , public natStorage : NativeStorage) {
    this.natStorage.getItem("sports").then(data=>{
      this.sports = data;
      this.sportsReady=true;
    },err=>{
      this.sportsProvider.getSports().subscribe(data=>{
        console.log(data);
        if(data.length != 0){
         this.sports= new Array();
        for(var i =0;i<data.length;i++){
          this.sports[i]=new Sports(data[i].SportName,data[i].SportID,data[i].SportDesc);
        }
        this.sportsReady=true;
        console.log(this.sports);
        this.natStorage.setItem("sprots",this.sports);
        }else{
          alert("NO Sports");
        }
      },err=>{
        console.log(err);
      })
    })
    
  }

  ionViewDidLoad() {
   
  }
   goTopage(sport : any ){
    this.navCtrl.push(SportsPage ,{
    sport : sport
    });
  }

}
