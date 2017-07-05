import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NotificationtabPage } from './notificationtab';

@NgModule({
  declarations: [
    NotificationtabPage,
  ],
  imports: [
    IonicPageModule.forChild(NotificationtabPage),
  ]
})
export class NotificationtabPageModule {}
