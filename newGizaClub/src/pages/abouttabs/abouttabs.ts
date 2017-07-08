import { Component } from '@angular/core';


import {PhilosophyPage} from '../philosophy/philosophy';
import {VisionPage} from '../vision/vision';
import { AboutPage } from '../about/about';
/**
 * Generated class for the AbouttabsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-abouttabs',
  templateUrl: 'abouttabs.html',
})
export class AbouttabsPage {
  aboutUs:any=AboutPage;
  Philosophy:any=PhilosophyPage;
  vision:any=VisionPage;
  constructor() {
  }



}
