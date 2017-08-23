import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {FormBuilder,FormGroup,Validators} from '@angular/forms';
import {NativeStorage} from '@ionic-native/native-storage';

import {User} from '../../templates/usertemplate';

import {UserProvider} from '../../providers/user/user';

import {HomePage} from '../home/home';
import {RegestrationPage} from '../regestration/regestration';
import {ForgetpwPage} from '../forgetpw/forgetpw';

/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
//@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  public name : string ='login';
  public loginForm : FormGroup;

   public defaultPage : string = "defaultPage";
   public loginBefore = false;
   public userdata:User;
   public userName:string="";
   private page:any;


  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     private formBuilder:FormBuilder,
     private natStorage : NativeStorage,
     private user : UserProvider
    ) {
      this.userdata=new User();
     // this.userdata=this.navParams.get("user");
     // if(this.userdata!= undefined){
      // this.userName=this.userdata.username;
      //} 
      this.natStorage.getItem("user").then(data=>{
        this.userName = data.username;
        this.userdata.memberId=data.memberId;
        this.userdata.email=data.email;
        this.userdata.mobile=data.mobile;
        this.userdata.dob=data.DOB;
        this.userdata.nid=data.nationalId;
        this.userdata.id=data.userID;
        this.userdata.password="";
        this.userdata.username=data.username;
      },err=>{
        alert(err);
      })
      this.buildloginForm();
      
      console.log(this.userdata);
}
  buildloginForm(): void {
		this.loginForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      Rpassword:['',[Validators.required,Validators.minLength(6)]]
		});
	}
  onLogin(): void{
    this.loginBefore = true;
    if(this.loginForm.value.password == this.loginForm.value.Rpassword){
      
      this.userdata.password = this.loginForm.value.password;
      this.page=HomePage;
      this.natStorage.setItem(this.defaultPage,this.page.name);
      this.natStorage.setItem('user',this.userdata);
      this.user.change_Password(this.userdata.mobile,this.userdata.password).subscribe(data=>{
        if(data=1){
          alert("password set");
        }else{
          alert("server error please try later");
        }
      },err=>{
        alert(err);
      })
    this.navCtrl.setRoot(this.page,{
        "user" : this.userdata
      });
    }else{
      alert(this.loginForm.value.password == this.loginForm.value.Rpassword);
    }
    
  }

  ionViewDidLoad() { 
      
    
 
  }
  
}
