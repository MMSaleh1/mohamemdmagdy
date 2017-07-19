import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InteractPage } from './interact';

@NgModule({
  declarations: [
    InteractPage,
  ],
  imports: [
    IonicPageModule.forChild(InteractPage),
  ],
  exports: [
    InteractPage
  ]
})
export class InteractPageModule {}
