import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ForgetpwPage } from './forgetpw';

@NgModule({
  declarations: [
    ForgetpwPage,
  ],
  imports: [
    IonicPageModule.forChild(ForgetpwPage),
  ],
  exports: [
    ForgetpwPage
  ]
})
export class ForgetpwPageModule {}
