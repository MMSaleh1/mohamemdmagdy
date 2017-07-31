import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CodeverificationPage } from './codeverification';

@NgModule({
  declarations: [
    CodeverificationPage,
  ],
  imports: [
    IonicPageModule.forChild(CodeverificationPage),
  ],
  exports: [
    CodeverificationPage
  ]
})
export class CodeverificationPageModule {}
