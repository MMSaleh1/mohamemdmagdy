import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PhilosophyPage } from './philosophy';

@NgModule({
  declarations: [
    PhilosophyPage,
  ],
  imports: [
    IonicPageModule.forChild(PhilosophyPage),
  ],
  exports: [
    PhilosophyPage
  ]
})
export class PhilosophyPageModule {}
