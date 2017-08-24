import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {SMS} from '@ionic-native/sms';
import {NativeStorage} from '@ionic-native/native-storage';

import {UserProvider} from '../../providers/user/user';
import {LoginPage} from '../login/login';
import {HomePage} from '../home/home';
import {User} from '../../templates/usertemplate';
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
  public defaultPage : string = "defaultPage";
  public code:any;
  private correctCode:any;
  private userdata:any;
  private relatives:Array<User>;

  constructor(public navCtrl: NavController,
    private sms : SMS,
    public navParams: NavParams,
    public user: UserProvider,
    public natStorage: NativeStorage
  ) {
    this.relatives = new Array();
      this.userdata=this.navParams.get("user");
      this.correctCode=this.navParams.get("code");
      this.natStorage.getItem("code").then((data)=>{
        this.correctCode = data;
         alert(this.correctCode);
      },
      err=>{
        alert(err);
      }
    );
    this.natStorage.getItem("user").then((data)=>{
      this.userdata = data;
    },
    err=>{
      alert(err);
    }
  )
      this.sendSms();
     
    console.log(this.userdata);
  }

  
  public sendCode(){
    console.log(this.code);
    if(this.code==this.correctCode){
      /*
      this.user.confirm_via_email_and_memberid(this.userdata.mobile,this.userdata.memberId).subscribe((data)=>{
        this.userdata.DOB= new Date(data[0].DOB);
        this.userdata.image=data[0].image;
        this.userdata.membershipType=data[0].membershipType;
        this.userdata.gender=data[0].gender;
        this.userdata.nationalId=data[0].nationalID;
        this.userdata.userID=data[0].userID;
        console.log(this.userdata);
        this.natStorage.setItem(this.defaultPage,LoginPage.name);
         this.navCtrl.setRoot(LoginPage,{"user":this.userdata});
      },(err)=>{
        alert("connection error,please try again");
      })
      */
      this.user.get_user_relatives(this.userdata.mobile,this.userdata.memberId).subscribe(data=>{
        let relativesNum=data.length-1;
        console.log(relativesNum);
        
        let owner =-1;
        //if(data[0].Relation == null){
        //   owner = 0;
        
       // }else{
          for(var i =0 ; i<data.length;i++){
            console.log(data[i].Relation);
            if(data[i].Relation==null){
              owner=i;
        //    }
          }
        }
        console.log(data);
        this.userdata.dob= data[owner].DOB;
        this.userdata.image=data[owner].image;
        this.userdata.membershipType=data[owner].membershipType;
        this.userdata.gender=data[owner].gender ? "male" : "female";
        this.userdata.memberId=data[owner].membershipID;
        this.userdata.username=data[owner].username;
        this.userdata.Relation=data[owner].Relation;
        this.userdata.familyId=data[owner].FamilyID;
        if(relativesNum >1){
          
          var counter=0;
          for(var i = owner ; i<data.length;i++){
            
            let tempUser:User = new User();

            tempUser.dob=data[i].DOB;
            tempUser.image=data[i].image;
            tempUser.membershipType=data[i].membershipType
            tempUser.gender=data[i].gender? "male" : "femail";
            tempUser.memberId=data[i].membershipID;
            tempUser.mobile=data[i].mobile;
            tempUser.email=data[i].e_mail;
            tempUser.username=data[i].username;
            tempUser.Relation=data[i].Relation;
            tempUser.familyId=data[i].FamilyID;
            this.relatives[counter]=tempUser;
            counter++;
          }
          console.log(this.relatives);
        }
        console.log(this.userdata);
         this.natStorage.setItem(this.defaultPage,HomePage.name);
         this.natStorage.setItem("relatives",this.relatives);
         this.natStorage.setItem("user",this.userdata);
          this.navCtrl.setRoot(HomePage);

      })
      
    }else{
      alert("worng code");
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
