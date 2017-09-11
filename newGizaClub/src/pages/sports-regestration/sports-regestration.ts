import { Component } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';
import {NativeStorage} from '@ionic-native/native-storage';

import {ListsportdetailsPage} from '../listsportdetails/listsportdetails';

import {User} from '../../templates/usertemplate';

/**
 * Generated class for the SportsRegestrationPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-sports-regestration',
  templateUrl: 'sports-regestration.html',
})
export class SportsRegestrationPage {
  public name :string = "Choose Member";

  public family :Array<User>;
  public user : User;
  public sport : any;
  public ready : boolean = false;
  constructor(public navCtrl: NavController, public navParams: NavParams,public natStorage : NativeStorage) {

      if(navParams.get("sport")){
        this.sport = navParams.get("sport");
      }
      console.log(this.sport);
      this.family = new Array();
      

      this.natStorage.getItem("relatives").then(data=>{
          this.family=data;
          this.user=this.family[0];
          this.ready=true;
      },err=>{
        this.user=new User("mohammed",'20',"assets/img/profileTemp.png","false",'123456789','1000','1111111111111','mohammed@edge',0,null,1000);
            this.family[0]=this.user;
            this.family[0].Relation="child";
          this.family[1]=this.family[0];
          this.family[2]=this.family[1];
          this.ready=true;
          console.log(this.family);
      })
      
      
  }
  public goToRegester(member : any){
    this.navCtrl.push(ListsportdetailsPage,{'member' : member , 'sport' :this.sport});

  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad SportsRegestrationPage');
  }

}
