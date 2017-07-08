import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SportslistPage } from './sportslist';

@NgModule({
  declarations: [
    SportslistPage,
  ],
  imports: [
    IonicPageModule.forChild(SportslistPage),
  ],
  exports: [
    SportslistPage
  ]
})
export class SportslistPageModule {}
