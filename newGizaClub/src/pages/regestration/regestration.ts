import { Component } from '@angular/core';
import { IonicPage, NavController} from 'ionic-angular';
import {FormBuilder,FormGroup,Validators} from '@angular/forms';
import {NativeStorage} from '@ionic-native/native-storage';
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
  public name : string="regestration";
  public regesterForm: FormGroup;
   public userState : string = "userState";
  public regesterBefore = false;
  constructor(public navCtrl: NavController,private formBuilder:FormBuilder , private natStorage : NativeStorage) {
  this.buildregesterForm();
  
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegestrationPage');
  }
  verification(){
  }
  buildregesterForm(): void {
		this.regesterForm = this.formBuilder.group({
			phone: ['', [Validators.required,Validators.maxLength(11),Validators.minLength(11)]],
      //password: ['', [Validators.required, Validators.minLength(6)]],
     // Rpassword: ['', [Validators.required, Validators.minLength(6)]]
		});
	}

  onRegester(){
    this.regesterBefore=true;
   // if(this.regesterForm.value.password == this.regesterForm.value.Rpassword && this.regesterForm.valid){
    //  this.natStorage.setItem(this.userState,"1");

    //}
    if(this.regesterForm.valid){
      console.log("valid");
    }
    //console.log(this.regesterForm.value.password);
    //console.log(this.regesterForm.value.Rpassword);
  }
  
}
