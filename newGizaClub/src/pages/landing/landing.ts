import { Component } from '@angular/core';
import {LoadingController,IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
/**
 * Generated class for the LandingPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
//@IonicPage()
@Component({
  selector: 'page-landing',
  templateUrl: 'landing.html',
})
export class LandingPage {
    	slideImages = [
		{ image: "assets/img/image1.jpg" },
		{ image: "assets/img/image2.jpg" },
		{ image: "assets/img/image3.jpg" }
	];
  logo = "assets/img/ngiza.png";
  constructor(public navCtrl: NavController, public navParams: NavParams,public loading:LoadingController) {
   

}

//  ionViewLoaded() {
    
  //let loader = this.loading.create({
  //  content: 'Getting latest entries...',
  //});

  //loader.present();
  //setTimeout(function() {

  //  loader.dismiss();
  //  this.navCtrl.push(HomePage);
  //}, 30000);

  
    
//}


}
