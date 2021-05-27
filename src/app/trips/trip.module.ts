import { NgModule } from '@angular/core';

import { NavigationModule } from '../navigation/navigation.module';
import { SearchTripsComponent } from './components/search-trips/search-trips.component';
import { TripRoutingModule } from './trip-routing.module';

@NgModule({
	declarations: [
		SearchTripsComponent,
	],
	imports: [
		NavigationModule,
		TripRoutingModule,
	],
})
export class TripModule { }
