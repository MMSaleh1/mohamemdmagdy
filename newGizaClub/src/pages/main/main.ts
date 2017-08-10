import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import {SportslistPage}from '../sportslist/sportslist';
import {SportsPage} from '../sports/sports';
import {ResturantsPage} from '../resturants/resturants'
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
    public sports : Array<{
    title : string,
    imageUrl : string,
    description : string
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
    this.sports=[{
      title : "Swimming",
      imageUrl :"assets/img/swimminglogo.png",
      description : `The club includes a fully imported
                      outdoor Myrtha Olympic swimming
                      pool complex that can be heated and
                      covered during the cold winter season.
                      Signed by the most innovative
                      and cutting-edge technologies, the
                      Olympic swimming pool also features
                      a 10m diving tower. There is
                      also a baby pool, which has a special area for the handicapped with an exclusively
                      built-in ramp. As well, a dedicated
                      medical team and a lifeguard
                      are always available for immediate
                      attention, securing a safe and smooth
                      experience at the pool area. The Olympic swimming pool caters to
                      the members’ variable interests. By
                      providing a wide range of water sports,
                      including water ballet, diving, water
                      polo and Techautics Swimming, all
                      youth, adult and senior members will
                      be encouraged to boost their agility
                      and fitness levels. The unmatched diversity
                      of the Olympic Academy’s programs
                      and strong affiliations makes
                      the club’s swimming pool an exclusive
                      hub for professional athletes. Professional
                      trainers will help amateurs and
                      professionals to qualify for national
                      teams, and compete in local and international
                      championships.`
    },
    {
      title : "Water Ballet",
      imageUrl :"assets/img/waterballetlogo.png",
      description : `Water ballet synchronized swimmers can
                      secure their professional development in
                      this elaborate and creative sport. Both individuals
                      and teams can embrace the space
                      given for their trainings to be able to perform
                      choreographed movements in NGSC’s
                      Olympic pool. Since Water ballet demands
                      great strength, endurance, flexibility Professional
                      trainers will mentor and supervise
                      each team member to qualify for national
                      and international teams and tournaments.`
    },
    {
      title : "Water Polo",
      imageUrl :"assets/img/waterpolo.png",
      description : `At NGSC’s Olympic swimming pool,
                      youth and adult members can tryout
                      to be part of the water polo team if eligible.
                      Players will have a designated
                      area in the pool to train and practice
                      to boost their endurance levels and
                      stamina. Team players will undergo
                      various levels of trainings and agility
                      workouts that will enable them to
                      qualify for national teams and international
                      tournaments`
    },
    {
      title : "Diving",
      imageUrl :"assets/img/divinglogo.png",
      description : `International diving classes are offered for members,
                      to learn how to use the most advanced diving equipment
                      in variable levels of depths. Padi and SSI certified
                      diving instructors will be carrying out regular
                      maintenance and safety checks. The diving instructors
                      aim to qualify members to professionally dive
                      in open sea, while ensuring a safe underwater diving
                      experience mentored with full expertise.`
    },
    {
      title : "Foot Ball",
      imageUrl :"assets/img/footballlogo.png",
      description : `The club offers the official
                      11-a-side football field that is
                      surrounded by a stadium to invite
                      a wide range of audience
                      and spectators as well as endorse
                      a full-fledge of local and
                      global championships. Another
                      5-a-side football field lies at
                      the side for recreational use and
                      alternative trainings. Built-in
                      locker rooms are provided for
                      the players, to securely leave
                      their belongings for as long as
                      they need. The players will also
                      be encouraged to join lectures
                      and engage in specialized workshops
                      in the Lecture Room, which
                      is fully-equipped with the latest
                      cutting-edge technologies and
                      projectors. Certified nutritionists
                      will customize special nutrition
                      plans for each player, which will
                      be followed up by professional
                      football instructors. Amateur and
                      professional football players will
                      be trained by world-class football
                      instructors to qualify them to join
                      national teams and compete in international
                      tournaments.`
    },
    {
      title : "Basket Ball",
      imageUrl :"assets/img/basketballlogo.png",
      description : `The club’s basketball court is highly maintained
                      with specialists who understand the
                      core of the game. The court’s clear-cut blocks
                      and polished grounds invite team members to
                      partake in professional or leisure games, with
                      the presence of audience and spectators. A
                      dedicated service area is an added highlight,
                      where sports specialists are available to assist
                      members with any of their needs. Meanwhile,
                      professional coaches help team players both
                      individually and together to qualify for national
                      teams and compete in local and international
                      tournaments.`
    },
    {
      title : "Gym",
      imageUrl :"assets/img/gymlogo.png",
      description : `The gym is one of the leading edge features of NGSC.
                      The two-story complex operates with a wide-range
                      of high-tech machines, a high-end sauna and steam
                      rooms, to bring the epitome of relaxation for its members.
                      Both security and hygiene are high-end at the
                      gym’s locker area, where belongings can be safe-kept in
                      privacy. A snack bar is also prepared with healthy meals
                      that help maintain fitness levels to a high before, during
                      and after the workout.
                      The gym also offers world-class training programs and
                      tailored nutrition plans that are designed to fit each
                      member’s age and fitness levels, with high skill and
                      diversity. Certified nutritionists will customize special
                      nutrition plans to help members lose or maintain their
                      weight, and improve their quality of life. Meanwhile,
                      the gym will open its doors to one of the most ultimate
                      training programs; the internationally practiced, Cross-
                      Fit. While, a number of professional trainers will also
                      be available for personal coaching and group classes,
                      ensuring a highly encouraging and fulfilling experience
                      for all members of the clubs.`
    },
    {
      title : "Judo",
      imageUrl :"assets/img/judologo.png",
      description : `NGSC members can join the modern martial art sport,
                      Judo. A special, well-maintained area taking the whole
                      basement area of the Squash building will be the Judo’s
                      main haven for combat. Trainees are provided
                      with the traditional judo clothing, including the cotton-
                      kimonos with their belts that match the different
                      skill levels. The Olympic sport is taught by certified
                      Judo instructors that train the judo practitioners to
                      qualify for national team and combat in international
                      competitions, including the Olympics.`
    },
    {
      title : "Gymnastics",
      imageUrl :"assets/img/gymnasticslogo.png",
      description : `The state-of-the-art Gymnastics complex is approved
                      by the International Gymnastics Federation,
                      the international governing body of gymnastics. It
                      is assembled with a full range of top quality SPIETH
                      equipment, which has always been a recognized
                      partner of the Olympics. There will also be professional
                      trainers who will coach all children starting
                      from 3 to 9 years of age. Whereas, advanced gymnasts
                      can train to enhance their skill for future competitions
                      at the Academy Room.
                      With private locker rooms, gymnasts can find the
                      security and privacy in freshening up. Gymnasts
                      can also unwind at their lounge area and grab fresh
                      drinks or wholesome snack to pump up their energy
                      levels and maintain their diet and wellbeing. Being
                      the core of all other sports, Gymnastics is one of the
                      greatest features of the NEWGIZA Sports Club, which
                      fuels members with high physical flexibility and
                      strengths for all other sports.`
    },
    {
      title : "Tennis",
      imageUrl :"assets/img/tennislogo.png",
      description : `Beginner and Professional tennis players can
                      thrive in the wide variety of tennis courts. The club
                      comprises of six tennis clay courts and two hard
                      courts. The tennis clay courts are especially suitable
                      for amateurs and professionals with regards to
                      their smooth surfaces that create a cooling effect
                      during the summer heat. Alternatively, the hard
                      courts stand out for their concrete base surfaces
                      that promote high speed play for tennis players
                      who enjoy it. Each tennis court undergoes regular
                      maintenance to ensure high quality and sustain
                      their durability. 
                      A racquet room also gives members the luxury
                      to fix their racquets and play other sports, such
                      as badminton. On the other hand, locker rooms
                      are provided for players to change in privacy
                      and enjoy a hot shower, before or after they
                      choose to unwind in the luxurious lounge area.
                      A special gym is also dedicated for tennis professionals
                      to improve their game, where the
                      recipe for the best training exercises from professional
                      instructors are provided. Advanced
                      players as well as beginners will undergo several
                      levels of classes and trainings to qualify
                      for national teams and compete in both local
                      16 and international tournaments.`
    },
    {
      title : "Squash",
      imageUrl :"assets/img/squashlogo.png",
      description : `There is no better sport than Squash to
                      alleviate our member’s stress while enjoying
                      a competitive game with a teammate.
                      The squash courts will have a dedicated
                      number of professional squash
                      trainers who will prepare players to join
                      local and international teams, to compete
                      in national and global tournaments.
                      The courts are the place where members
                      can increase their agility, coordination
                      and fitness as they run, leap and dive for
                      the ball.`
    },
    {
      title : "Paddle Tennis",
      imageUrl :"assets/img/paddletennislogo.png",
      description : `The club offers one of the newest,
                      most emerging racquet sport for
                      its members, Paddle Tennis. Junior
                      and adult players can enjoy an
                      easy-to-learn and safe sport, either
                      privately or with groups. The
                      sport is coached by specialists who
                      receive training courses themselves,
                      to ensure that full expertise
                      is given to members of different
                      age groups and physical conditions.
                      Professional Paddle Tennis
                      players can partake in local and
                      international tournaments in the
                      club’s courts, allowing champions
                      to rise from NGSC.`
    },
     {
      title : "Beach Volly Ball",
      imageUrl :"assets/img/beachvollyballlogo.png",
      description : `In contrast to indoor volleyball, the
                      club’s Sand Volleyball courts provide
                      a refreshing experience for its
                      players. Set at the heart of NEWGIZA
                      Sports Club, members can enjoy a
                      visually balancing scenery of the
                      Greenheart Park’s vast green fields.
                      The fresh outdoors offers players
                      with a vibrant space to improve their
                      sets and team play, while enjoying a
                      beach-like setting.`
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
    this.navCtrl.push(SportsPage,{
      "sport" : event
   });
  }
  goToNotifications(){
   // this.navCtrl.push(NotificationtabPage);
  }
  goToEvents(){
    this.navCtrl.push(SportslistPage);
  }

  goToRestaurant(slide :any){
    this.navCtrl.push(ResturantsPage,{"restaurnt":slide});
    console.log(slide);
  }

}
