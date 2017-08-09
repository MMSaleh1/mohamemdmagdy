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
   private page:any;
   private pages ={
     fp : 'ForgetpwPage',
     rg : 'RegestrationPage'
   }
  constructor(public navCtrl: NavController, public navParams: NavParams,private formBuilder:FormBuilder,private natStorage : NativeStorage) {
  this.buildloginForm();
}
  buildloginForm(): void {
		this.loginForm = this.formBuilder.group({
			email: ['', [Validators.required, Validators.pattern(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()\.,;\s@\"]+\.{0,1})+[^<>()\.,;:\s@\"]{2,})$/)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
		});
	}
  onLogin(): void{
    this.loginBefore = true;
    if(this.loginForm.valid){
      this.page=HomePage;
      this.natStorage.setItem(this.userState,"2");
    this.navCtrl.setRoot(this.page);
    }
    
  }

  ionViewDidLoad() {
    
 
  }
  pushPage(page : any){
    switch (page){
      case'RegestrationPage':
        this.page= RegestrationPage;
        break;
        case 'ForgetpwPage':
        this.page= ForgetpwPage;
        break;
    }
    
      this.navCtrl.push(this.page,{
        name : "mohammed"
      });

}
}
