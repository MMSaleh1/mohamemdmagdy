import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the MainPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-main',
  templateUrl: 'main.html',
})
export class MainPage {
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
   private resturants:Array<{
      name : any,
      imageUrl : any,
      des : any,
      menu : Array<{
        name:any,
        imageUrl:any,
        price : number,
        des : any
      }>,
  }>;

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
  this.resturants=[{
      name :'McDonald`s',
      imageUrl:'assets/img/McDonald`s.png',
      des:'Burger',
      menu:[{
        name: 'Big Mac',
        imageUrl: 'assets/img/burger.png',
        price: 12,
        des:'Reguler Burger , 100% Beef patty'
      },{
      name: 'Big Mac2',
        imageUrl: 'assets/img/burger.png',
        price: 12,
        des:'Reguler Burger , 100% Beef patty'
      },{
      name: 'Big Mac3',
        imageUrl: 'assets/img/burger.png',
        price: 12,
        des:'Reguler Burger , 100% Beef patty'
      }
    ]
    },
    {
      name :'BurgerKing',
      imageUrl:'assets/img/BurgerKing.png',
      des:'Burger',
      menu:[{
        name: 'WHOPPER',
        imageUrl: 'assets/img/burger.png',
        price: 12,
        des:'Reguler Burger , 100% Beef patty'
      }]
    },
    {
      name :'Domino`sPizza',
      imageUrl:'assets/img/Domino`sPizza.png',
      des:'pizza',
      menu:[{
        name: 'pizza',
        imageUrl: 'assets/img/pizza.png',
        price: 12,
        des:'Reguler Pizza, with your favorite toppings'
      }]
    }
  ];
    let output = this.navParams.get("name");
    console.log(output);

  }
  openNotifcation(){
    console.log("notification opened");
  }
  
  goToEvent(event : any){
    //this.navCtrl.push(EventPage,{
   //   event : event
   // });
  }
  goToNotifications(){
   // this.navCtrl.push(NotificationtabPage);
  }
  goToEvents(){
   // this.navCtrl.push(AllEventsPage);
  }

  goToRestaurant(slide :any){
    console.log(slide);
  }

}
