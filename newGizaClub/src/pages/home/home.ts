import { Component } from '@angular/core';

import{ FacilitieslistPage} from '../facilitieslist/facilitieslist';
import{ SportslistPage} from '../sportslist/sportslist';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
   public facilities= FacilitieslistPage;
   public sports= SportslistPage;

  constructor() {

  }

}
