import { Component } from '@angular/core';
import { IonicPage, NavController,MenuController} from 'ionic-angular';
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
  constructor(public userProvider :UserProvider,
    public navCtrl: NavController,
    private formBuilder:FormBuilder ,
    private natStorage : NativeStorage,
    private menu : MenuController

  ) {
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
       
      this.natStorage.setItem(this.userState,"1");
      console.log(this.regesterForm.value.phone);
      let tempUser=[{
          img : "assets/img/profileTemp.png",
          name: 'user',
          id : '10',
          rfid : '100000',
          dob : '1 Nov 2017',
          nid : '1221432351556',
          mobileNum : '01099297597',
          memberId : '123456789',
          email : 'user@edge.com',
          normnatedBy : '----------------------------',
          occupation : 'Academic Occupation',
          applicationNum : "1 Nov 2004"
        },
        {
          img : "assets/img/profileTemp.png",
          name: 'spouse',
          id : '185658765',
          rfid : '87658765876',
          dob : '1 Nov 2017',
          nid : '8765905876487',
          mobileNum : '01558745896',
          memberId : '123456789',
          email : 'spouse@edge.com',
          normnatedBy : '----------------------------',
          occupation : 'Academic Occupation',
          applicationNum : "1 Nov 2004"
        },
        {
          img : "assets/img/profileTemp.png",
          name: 'child1',
          id : '10',
          rfid : '100000',
          dob : '1 Nov 2017',
          nid : '1221432351556',
          mobileNum : '01099297597',
          memberId : '123456789',
          email : 'child1@edge.com',
          normnatedBy : '----------------------------',
          occupation : 'Academic Occupation',
          applicationNum : "1 Nov 2004"
        },{
          img : "assets/img/profileTemp.png",
          name: 'child2',
          id : '10',
          rfid : '100000',
          dob : '1 Nov 2017',
          nid : '1221432351556',
          mobileNum : '01099297597',
          memberId : '123456789',
          email : 'child2@edge.com',
          normnatedBy : '----------------------------',
          occupation : 'Academic Occupation',
          applicationNum : "1 Nov 2004"
        }
      ];
      this.user=tempUser;
      this.navCtrl.setRoot(CodeverificationPage,{"user":this.user});
      /*
      this.userProvider.regester(this.regesterForm.value.phone).subscribe(data=>{
        this.user=data[0];
        console.log(this.user);
        this.natStorage.setItem("user",this.user);
        
        this.navCtrl.setRoot(CodeverificationPage,{"user":this.user});
      },(err)=>{
        let tempUser=[{
          img : "assets/img/profileTemp.png",
          name: 'user',
          id : '10',
          rfid : '100000',
          dob : '1 Nov 2017',
          nid : '1221432351556',
          mobileNum : '01099297597',
          memberId : '123456789',
          email : 'user@edge.com',
          normnatedBy : '----------------------------',
          occupation : 'Academic Occupation',
          applicationNum : "1 Nov 2004"
        },
        {
          img : "assets/img/profileTemp.png",
          name: 'spouse',
          id : '185658765',
          rfid : '87658765876',
          dob : '1 Nov 2017',
          nid : '8765905876487',
          mobileNum : '01558745896',
          memberId : '123456789',
          email : 'spouse@edge.com',
          normnatedBy : '----------------------------',
          occupation : 'Academic Occupation',
          applicationNum : "1 Nov 2004"
        },
        {
          img : "assets/img/profileTemp.png",
          name: 'child1',
          id : '10',
          rfid : '100000',
          dob : '1 Nov 2017',
          nid : '1221432351556',
          mobileNum : '01099297597',
          memberId : '123456789',
          email : 'child1@edge.com',
          normnatedBy : '----------------------------',
          occupation : 'Academic Occupation',
          applicationNum : "1 Nov 2004"
        },{
          img : "assets/img/profileTemp.png",
          name: 'child2',
          id : '10',
          rfid : '100000',
          dob : '1 Nov 2017',
          nid : '1221432351556',
          mobileNum : '01099297597',
          memberId : '123456789',
          email : 'child2@edge.com',
          normnatedBy : '----------------------------',
          occupation : 'Academic Occupation',
          applicationNum : "1 Nov 2004"
        }
      ];
      this.user=tempUser;
      this.navCtrl.setRoot(CodeverificationPage,{"user":this.user});
      }
    );
    */
     }
     
    }
  
}
