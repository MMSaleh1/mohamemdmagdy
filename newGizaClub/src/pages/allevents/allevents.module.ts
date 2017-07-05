import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AllEventsPage } from './allevents';

@NgModule({
  declarations: [
    AllEventsPage,
  ],
  imports: [
    IonicPageModule.forChild(AllEventsPage),
  ],
  exports: [
    AllEventsPage
  ]
})
export class AllEventsPageModule {}
