import { Component } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';

import {FacilitiesPage} from '../facilities/facilities';
/**
 * Generated class for the FacilitieslistPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-facilitieslist',
  templateUrl: 'facilitieslist.html',
})
export class FacilitieslistPage {
  public name : string ="facilities";
public facilities : Array<{
    title : string , 
    description : string,
  }>;
  
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.facilities=[
      {
        title : "BRICKLANE",
        description :`Catering to everyday necessities, Bricklane
is set to be the focal point that
serves the NEWGIZA community and
NGSC members. With a spacious parking
space set next to a drop-off area, members
can quickly access service vendors,
supermarkets, boutique grocers, a bank
and a laundry service that together
coexist in the outdoors court.
At Bricklane, a simple walk will take
you on a journey of the senses. Catch a
whiff of freshly baked goods and reward
yourself with the taste of freshly brewed
coffee. Remember, life is grand and it’s
the little things that matter. It also accommodates
a shopping court, where it is
easy to find fresh-out of-the oven pastries,
local products, select French cheese, dairyfree
milk and your favorite salmon fillet.
Bricklane is a place where NEWGIZA residents
and club members can take the time
to enjoy shopping and spoil themselves to
a manicure.
Bricklane takes into account personal
needs as well, by featuring a five-star
patient-centric family healthcare service,
residents and club members can feel secure
with expert safe care. There’s no need
to compromise; going to Bricklane will be
exciting for the whole family.`

      },
      {
        title : "PROSHOPS",
        description :`The gymnastics building, the swimming
pool, and the tennis and squash
courts are all equipped with a Pro-Shop
that provides beginner and professional
gears. Members of different age groups
and abilities can enjoy the variety of
high quality equipment to address their
requirements and needs.`
      },
      {
        title : "HANDICAP FRIENDLY",
        description :`The club is entirely designed to accommodate
for members who are handicapped or
with special needs. The swimming pools
are structured with special ramps to fit
wheel chairs and secure members to swim
and partake in classes suitably.
Also, the club’s smooth walking trails,
dry-land ramps, spacious elevators, and
lockers rooms allow maximized convenience,
and a full-day of activities and
relaxation.`
      },
      {
        title : "FAMILY ROOMS",
        description :`Providing a hassle-free experience
for families with their infants and
children is one of the club’s main
goals. At NGSC, parents will find
ease in caring for their young ones
and accommodating to their needs
in the privately furnished family
rooms. Adjusted room temperature,
spaciousness and reserved areas
that offer comfortable seating,
are the highlight of a mentally and
physically relaxing experience for
parents and families.`
      },
      {
        title : "PHYSICAL THERAPY",
        description :`Every athlete’s safe-haven is a
specialized center that acutely
cares for their health, treats their
injuries, rehabilitates them back
into sports, and educates them
about particular techniques to
improve their mobility and boost
their quality of life. At the Physiotherapy
and Rehabilitation Center,
certified physiotherapists
offer all-day consultations
and examinations as well as
specialized treatments, such
as relaxation massages, heat
and ultrasound therapies, and
many other alternatives, for
both recreational and professional
athletes alike.`
      },
      {
        title : "SMART CLUB",
        description :`The club uses cutting-edge technology
that provides convenience and
hassle free experience to its members.
Through our collaboration with
Edge Solutions, we will provide all
NGSC members with Radio Frequency
Identification (RFID) Technology,
which will ultimately provide outof-
the-box solutions for members
to reduce stress and enhance their
quality of life.
Each member, child or adult, will own
a water-proof membership bracelet
and an exclusive NGSC app. At the tip
of their fingers, members will receive
real-time notifications about organized
events, trips and special promotions.
With user-friendly features and`
      },
      {
        title : "THE NOTARIZATION CENTER",
        description :`Securing the convenience of our members is key,
and at the club’s Notarization Center, this is real-
time. Members can alleviate their worries of having
to take a trip to Downtown Cairo for legal paperwork,
and instead, rely on the Notarization Center to
issue government-related papers, such as the driving
license. It is a day’s highlight of getting things
done, with its luxurious seating area and air-conditioned
space. The high-tech, electronic accessibility
that speeds up the process in close proximity to the
club’s facilities and residential areas.`
      },
      {
        title : "THE SERVICE AREAS",
        description :`The club ensures that its members
receive optimum customer service
by dedicating a service area
in each of its sport facilities and
buildings. Specialized service staff
members are hired with expertise,
to assist kids, teenagers, adults
and seniors and provide them with
a complete quality experience at
the NEWGIZA Sports Club.`
      },
      {
        title : "SECURITY",
        description :`NGSC is intelligently designed to
provide maximized security for its
members. It is fully equipped with
the latest closed-circuit television
(CCTV) cameras, and 24 hour monitoring
and surveillance technologies,
ensuring our members’ safety and
wellbeing all around the club.`
      }
    ];
  }

  ionViewDidLoad() {
  }
   goTopage(facility : any ){
    this.navCtrl.push(FacilitiesPage ,{
      "facility" : facility
    });
  }

}
