import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {FormBuilder,FormGroup,Validators} from '@angular/forms';
import {NativeStorage} from '@ionic-native/native-storage';

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
   public userState : string = "userState";
   public loginBefore = false;
   public userdata:any;
   public userName:string="";
   private page:any;
   private pages ={
     fp : 'ForgetpwPage',
     rg : 'RegestrationPage'
   }
  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     private formBuilder:FormBuilder,
     private natStorage : NativeStorage
    ) {
      this.userdata=this.navParams.get("user");
      if(this.userdata!= undefined){
        this.userName=this.userdata[0].name;
      } 
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
    if(this.loginForm.valid && this.loginForm.value.password == this.loginForm.value.Rpassword){
      this.page=HomePage;
      this.natStorage.setItem(this.userState,"3");
    this.navCtrl.setRoot(this.page,{
        user : this.userdata
      });
    }
    
  }

  ionViewDidLoad() { 
      
    
 
  }
  
}
