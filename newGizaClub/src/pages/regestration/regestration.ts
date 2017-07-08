import { Component } from '@angular/core';
import { IonicPage, NavController,  } from 'ionic-angular';
import {FormBuilder,FormGroup,Validators} from '@angular/forms';

/**
 * Generated class for the RegestrationPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-regestration',
  templateUrl: 'regestration.html',
})
export class RegestrationPage {
  public regesterForm: FormGroup;
  public regesterBefore = false;
  constructor(public navCtrl: NavController,private formBuilder:FormBuilder) {
  this.buildregesterForm();
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegestrationPage');
  }
  verification(){
  }
  buildregesterForm(): void {
		this.regesterForm = this.formBuilder.group({
			email: ['', [Validators.required, Validators.pattern(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()\.,;\s@\"]+\.{0,1})+[^<>()\.,;:\s@\"]{2,})$/)]],
			membership: ['',[Validators.required,Validators.minLength(6),Validators.maxLength(6)]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,10}/)]],
      Rpassword: ['', [Validators.required, Validators.minLength(6), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,10}/)]],
			name: ['', [Validators.required, Validators.minLength(6)]],
			phone: ['', [Validators.required, Validators.minLength(10), Validators.pattern(/^01[0-2][0-9]{8}$/)]]
		});
	}

  onRegester(){
    this.regesterBefore=true;
    console.log(this.regesterForm.value.password);
    console.log(this.regesterForm.value.Rpassword);
  }
  
}
