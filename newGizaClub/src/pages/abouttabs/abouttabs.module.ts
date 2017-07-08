import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AbouttabsPage } from './abouttabs';

@NgModule({
  declarations: [
    AbouttabsPage,
  ],
  imports: [
    IonicPageModule.forChild(AbouttabsPage),
  ],
  exports: [
    AbouttabsPage
  ]
})
export class AbouttabsPageModule {}
