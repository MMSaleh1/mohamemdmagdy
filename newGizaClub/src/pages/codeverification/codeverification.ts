import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {NativeStorage} from '@ionic-native/native-storage';

import {UserProvider} from '../../providers/user/user';
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
  private family:Array<User>;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public userProvider: UserProvider,
    public natStorage: NativeStorage
  ) {
    this.family = new Array();
      
      
      this.natStorage.getItem("code").then((data)=>{
        this.correctCode = data;
      },
      err=>{
        this.correctCode=this.navParams.get("code");
      }
    );
    this.natStorage.getItem("user").then((data)=>{
      this.userdata = data;
      alert(this.correctCode);
      
      //this.sendSms();
    },
    err=>{
      this.userdata=this.navParams.get("user");
      alert(this.correctCode);
      // this.sendSms();
      console.log(this.userdata);
    }
  )
  }

  
  public sendCode(){
    if(this.code==this.correctCode){
     
      this.userProvider.get_user_relatives(this.userdata.mobile,this.userdata.memberId).subscribe(data=>{
        if(data.length > 0){
          console.log(data);
          let owner =-1;
          for(let i =0 ; i<data.length;i++){
            if(data[i].Relation==null){
              owner=i;
          }
        }
          for(let i =owner ,j=0 ; i<data.length;i++,j++){
            this.family[j] = new User(data[i].username,data[i].DOB,data[i].PhotoURL,data[i].membershipType,data[i].membershipID,data[i].FamilyID,data[i].mobile,data[i].e_mail,data[i].gender,data[i].Relation,data[i].Balance)
          }
          this.userdata = this.family[0];
          console.log(this.userdata);
          console.log(this.family);
          this.userProvider.get_user_balance_history(this.userdata.memberId).subscribe(data=>{
            console.log(data);
          })
           this.natStorage.setItem(this.defaultPage,"2");
           this.natStorage.setItem("relatives",this.family);
           this.natStorage.setItem("user",this.userdata);
            this.navCtrl.setRoot(HomePage);
        }else{
          alert("No user Data please contact NGSC office");
        }
      })
    }else{
      alert("worng code");
    }
  }
  public requestCode(){
    this.userProvider.regester_datatable(this.userdata.mobile).subscribe((data)=>{
      this.correctCode=data[0].code;
      alert(this.correctCode);
    },(err)=>{
      alert(err);
    });
  }
ionViewDidLoad() {
    console.log('ionViewDidLoad CodeverificationPage');
  }
}
