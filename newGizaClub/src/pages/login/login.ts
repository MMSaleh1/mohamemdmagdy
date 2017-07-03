import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {FormBuilder,FormGroup,Validators} from '@angular/forms';

/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  public loginForm : FormGroup;
   public loginBefore = false;
  constructor(public navCtrl: NavController, public navParams: NavParams,private formBuilder:FormBuilder) {
  this.buildloginForm();
}
  buildloginForm(): void {
		this.loginForm = this.formBuilder.group({
			email: ['', [Validators.required, Validators.pattern(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()\.,;\s@\"]+\.{0,1})+[^<>()\.,;:\s@\"]{2,})$/)]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,10}/)]],
		});
	}
  onLogin(): void{
    this.loginBefore = true;
       console.log(this.loginForm.value.password);
    console.log(this.loginForm.value.email);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
 
  }

}
