import { NgModule } from '@angular/core';

import { AutocompleteModule } from '@components/autocomplete/autocomplete.module';
import { SearchTripsComponent } from '@components/search-trips/search-trips.component';
import { NavigationModule } from '@modules/navigation/navigation.module';
import { TripRoutingModule } from '@modules/trip-routing.module';

@NgModule({
	declarations: [
		SearchTripsComponent,
	],
	imports: [
		AutocompleteModule,
		NavigationModule,
		TripRoutingModule,
	],
})
export class TripModule { }
