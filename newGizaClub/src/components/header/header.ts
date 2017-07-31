import { Component,Input } from '@angular/core';
import {NativeStorage} from '@ionic-native/native-storage';
import {NavController} from 'ionic-angular';
import {LoginPage} from '../../pages/login/login';
import {RegestrationPage} from '../../pages/regestration/regestration';
/**
 * Generated class for the HeaderComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'ngsc-header',
  templateUrl: 'header.html'
})
export class HeaderComponent {
@Input()
  name: string="header";
  logedIn :boolean = false;
  userState : string = "userState";
  constructor(public nativeStorage :NativeStorage,public navCtrl :NavController) {
   this.init;
    
  }
  private init(){
    if(typeof this.nativeStorage.getItem(this.userState)!=undefined && typeof this.nativeStorage.getItem(this.userState)!=null ){
       let state = this.nativeStorage.getItem(this.userState);
      state.then((data)=>{
        if(data == "2"){
          this.logedIn=true;
        }else{
          this.logedIn=false;
        }
        
        },(err)=>{
          this.logedIn=false;
      }
    )
      
  }
  }

  public logOut(){
    this.nativeStorage.setItem(this.userState,"0");
    this.init();
    this.navCtrl.setRoot(RegestrationPage);
    
  }
  ionViewDidLoad() {
    this.init()
  }

}
