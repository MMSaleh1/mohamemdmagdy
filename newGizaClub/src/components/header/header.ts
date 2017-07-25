import { Component,Input } from '@angular/core';
import {NativeStorage} from '@ionic-native/native-storage';
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
  constructor(public nativeStorage :NativeStorage) {
   
    if(typeof this.nativeStorage.getItem(this.userState)!=undefined && typeof this.nativeStorage.getItem(this.userState)!=null ){
       let state = this.nativeStorage.getItem(this.userState);
      state.then((data)=>{
        if(data == "2"){
          this.logedIn=true;
        }
        
        },(err)=>{
          this.logedIn=false;
      }
    )
      
    }
   
   // this.name = 'header';
  }

  public logOut(){
    this.nativeStorage.setItem(this.userState,"1");
    alert(this.nativeStorage.getItem(this.userState));
  }

}
