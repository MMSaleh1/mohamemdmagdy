import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MasterplanPage } from './masterplan';

@NgModule({
  declarations: [
    MasterplanPage,
  ],
  imports: [
    IonicPageModule.forChild(MasterplanPage),
  ],
  exports: [
    MasterplanPage
  ]
})
export class MasterplanPageModule {}
