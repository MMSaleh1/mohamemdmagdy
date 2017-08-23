import { Component,Input } from '@angular/core';
import {NativeStorage} from '@ionic-native/native-storage';
import {NavController} from 'ionic-angular';
import {LoginPage} from '../../pages/login/login';
import {RegestrationPage} from '../../pages/regestration/regestration';
import {HomePage} from '../../pages/home/home';
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
  //logedIn :boolean = true;
  defaultPage : string = "defaultPage";
  constructor(public nativeStorage :NativeStorage,public navCtrl :NavController) {
  // this.init();
    
  }
  /*
  private init(){
    if(typeof this.nativeStorage.getItem(this.defaultPage)!=undefined && typeof this.nativeStorage.getItem(this.defaultPage)!=null ){
       this.nativeStorage.getItem(this.defaultPage).then((data)=>{
        if(data == HomePage){
          this.logedIn=true;
        }else{
          this.logedIn=false;
        }
        
        },(err)=>{
          this.logedIn=true;
      }
    )
      
  }
  }
*/
  public logOut(){
    this.nativeStorage.setItem(this.defaultPage,RegestrationPage);
   // this.init();
    this.navCtrl.setRoot(RegestrationPage);
    
  }
  ionViewDidLoad() {
  }

}
