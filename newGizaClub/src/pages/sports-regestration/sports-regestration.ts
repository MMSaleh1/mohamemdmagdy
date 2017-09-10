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
      this.user=new User("mohammed",'20',"assets/img/profileTemp.png","false",'123456789','1000','1111111111111','mohammed@edge',0,null,1000);

      this.natStorage.getItem("relatives").then(data=>{
        for(var i =0 ; i<data.length;i++){
          var tempUser:User=new User();
          tempUser.dob=data[i].dob;
          tempUser.image=data[i].image;
          //tempUser.image="assets/img/profileTemp.png";
          tempUser.membershipType=data[i].membershipType;
          tempUser.gender=data[i].gender;
          tempUser.memberId=data[i].memberId;
          tempUser.username=data[i].username;
          tempUser.Relation=data[i].Relation;
          tempUser.mobile=data[i].mobile;
          tempUser.email=data[i].email;
          tempUser.familyId=data[i].familyId;
          this.family[i]=tempUser;
          this.user=this.family[0];
          this.ready=true;
        }
      },err=>{
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
