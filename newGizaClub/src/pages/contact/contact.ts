import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {
  public name : string ="contact us";
  constructor(public navCtrl: NavController) {

  }

}
