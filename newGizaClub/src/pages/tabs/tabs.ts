import { Component } from '@angular/core';

import { ContactPage } from '../contact/contact';
import{ FacilitieslistPage} from '../facilitieslist/facilitieslist';
import{ SportslistPage} from '../sportslist/sportslist';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = FacilitieslistPage;
  tab2Root = SportslistPage;
  tab3Root = ContactPage;

  constructor() {

  }
}
