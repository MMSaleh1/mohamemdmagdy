import { Component } from '@angular/core';
import { NavController,NavParams } from 'ionic-angular';

import{ EventPage }from '../event/event';
import{ NotificationsPage} from '../notifications/notifications';
import {AllEventsPage} from '../allevents/allevents';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public Notifications : Array<{
    title : string , 
    time  : any,
    description : string,
    isNew : boolean
  }>;
  public events : Array<{
    title : string,
    imageUrl : string,
    description : string
  }>

  constructor(public navCtrl: NavController,public navParams : NavParams) {
    this.Notifications=[
      {
        title : "FirstNotif",
        time: '10:40',
        description :'this is the first notification testing notification formating',
        isNew : true
      },
      {
        title : "SecondNotif",
        time: '11:15',
        description :'this is the Second notification testing notification formating',
        isNew : true
      }
    ];
    this.events=[{
      title : "event1",
      imageUrl :"assets/img/image1.jpg",
      description : "this is event1"
    },
    {
      title : "event2",
      imageUrl :"assets/img/image2.jpg",
      description : "this is event2"
    },
    {
      title : "event3",
      imageUrl :"assets/img/image3.jpg",
      description : "this is event3"
    },
    {
      title : "event5",
      imageUrl :"assets/img/image5.jpg",
      description : "this is event5"
    },
    {
      title : "event4",
      imageUrl :"assets/img/image4.jpg",
      description : "this is event4"
    },
    {
      title : "event6",
      imageUrl :"assets/img/image6.jpg",
      description : "this is event6"
    }
    ];
    let output = this.navParams.get("name");
    console.log(output);

  }
  openNotifcation(){
    console.log("notification opened");
  }
  goToEvent(event : any){
    this.navCtrl.push(EventPage,{
      event : event
    });
  }
  goToNotifications(){
    this.navCtrl.push(NotificationsPage);
  }
  goToEvents(){
    this.navCtrl.push(AllEventsPage);
  }

}
