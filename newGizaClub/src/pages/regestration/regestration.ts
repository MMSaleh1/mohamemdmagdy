import { Component } from '@angular/core';
import { IonicPage, NavController,MenuController} from 'ionic-angular';
import {FormBuilder,FormGroup,Validators} from '@angular/forms';
import {NativeStorage} from '@ionic-native/native-storage';

import {CodeverificationPage} from '../codeverification/codeverification';
import {UserProvider} from '../../providers/user/user';

import {User} from '../../templates/usertemplate';
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
  public user : User ;
  public debugOutput:string ="test";


  constructor(public userProvider :UserProvider,
    public navCtrl: NavController,
    private formBuilder:FormBuilder ,
    private natStorage : NativeStorage,
    private menu : MenuController

  ) {
    this.user = new User();
    this.menu.swipeEnable(false);
  this.buildregesterForm();
  
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegestrationPage');
  }
  verification(){
  }
  buildregesterForm(): void {
		this.regesterForm = this.formBuilder.group({
			phone: ['', [Validators.required, Validators.maxLength(11),Validators.minLength(11)]]
  });
  }

  onRegester(){
    this.regesterBefore=true;
      
      //this.natStorage.getItem('code').then(code=>{
      //  console.log(code);
     // })
     if(this.regesterForm.valid){
      console.log(this.regesterForm.value.phone);
      //this.navCtrl.setRoot(CodeverificationPage,{"user":this.user});
      
      this.userProvider.regester_datatable(this.regesterForm.value.phone).subscribe(data=>{
        if(data != []){
          this.natStorage.setItem(this.userState,"1");
          console.log(data);
        this.user.username=data[0].name;
        this.user.email=data[0].email;
        this.user.membershipID=data[0].member_id;
        this.user.mobile=data[0].mobile;
        let code = data[0].code;
        console.log(this.user);
        this.natStorage.setItem("user",this.user);
        this.natStorage.setItem("code",code);
        this.navCtrl.setRoot(CodeverificationPage,{"user":this.user , "code":code});
        }else{
          alert("please enter a valid phone number");
        }
      },(err)=>{
        this.debugOutput=JSON.stringify(err.json());
        alert("connection error, please try again");
      }
    );
    
     }
     
    }
  
}
