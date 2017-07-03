import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RegestrationPage } from './regestration';

@NgModule({
  declarations: [
    RegestrationPage,
  ],
  imports: [
    IonicPageModule.forChild(RegestrationPage),
  ],
  exports: [
    RegestrationPage
  ]
})
export class RegestrationPageModule {}
