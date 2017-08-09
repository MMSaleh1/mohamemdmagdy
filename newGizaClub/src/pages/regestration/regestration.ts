import { Component } from '@angular/core';
import { IonicPage, NavController} from 'ionic-angular';
import {FormBuilder,FormGroup,Validators} from '@angular/forms';
import {NativeStorage} from '@ionic-native/native-storage';

import {CodeverificationPage} from '../codeverification/codeverification';
import {UserProvider} from '../../providers/user/user';
/**
 * Generated class for the RegestrationPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
//@IonicPage()
@Component({
  selector: 'page-regestration',
  templateUrl: 'regestration.html',
})
export class RegestrationPage {
  public name : string="regestration";
  public regesterForm: FormGroup;
   public userState : string = "userState";
  public regesterBefore = false;
  public user : any;
  constructor(public userProvider :UserProvider,public navCtrl: NavController,private formBuilder:FormBuilder , private natStorage : NativeStorage) {
  this.buildregesterForm();
  
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegestrationPage');
  }
  verification(){
  }
  buildregesterForm(): void {
		this.regesterForm = this.formBuilder.group({
			email: ['', [Validators.required, Validators.pattern(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()\.,;\s@\"]+\.{0,1})+[^<>()\.,;:\s@\"]{2,})$/)]]
		});
	}

  onRegester(){
    this.regesterBefore=true;
      
      //this.natStorage.getItem('code').then(code=>{
      //  console.log(code);
     // })
     if(this.regesterForm.valid){
       
      this.natStorage.setItem(this.userState,"1");
      console.log(this.regesterForm.value.email);
      this.userProvider.regester_datatable(this.regesterForm.value.email).subscribe(data=>{
        this.user=data[0];
        console.log(this.user);
        this.natStorage.setItem("user",this.user);
      });
      this.navCtrl.setRoot(CodeverificationPage);
     }
     
    }
  
}
