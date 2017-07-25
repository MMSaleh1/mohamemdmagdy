import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {FormBuilder,FormGroup,Validators} from '@angular/forms';
/**
 * Generated class for the ForgetpwPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-forgetpw',
  templateUrl: 'forgetpw.html',
})
export class ForgetpwPage {
  public name : string ="Forget pw";
   public fpForm : FormGroup;
   public sentBefore = false;
  constructor(public navCtrl: NavController, public navParams: NavParams,private formBuilder:FormBuilder) {
  this.buildFpForm();
}
  buildFpForm(): void {
		this.fpForm = this.formBuilder.group({
			email: ['', [Validators.required, Validators.pattern(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()\.,;\s@\"]+\.{0,1})+[^<>()\.,;:\s@\"]{2,})$/)]]
		});
	}
  ionViewDidLoad() {
    
  }
  Send(){
    this.sentBefore=true;
    console.log(this.fpForm.value.email);
  }

}
