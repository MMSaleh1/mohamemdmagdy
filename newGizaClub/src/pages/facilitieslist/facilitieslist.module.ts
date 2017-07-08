import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FacilitieslistPage } from './facilitieslist';

@NgModule({
  declarations: [
    FacilitieslistPage,
  ],
  imports: [
    IonicPageModule.forChild(FacilitieslistPage),
  ],
  exports: [
    FacilitieslistPage
  ]
})
export class FacilitieslistPageModule {}
