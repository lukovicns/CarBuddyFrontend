import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AutocompleteModule } from '@components/autocomplete/autocomplete.module';
import { CardModule } from '@components/card/card.module';
import { SearchTripsComponent } from '@components/search-trips/search-trips.component';
import { NavigationModule } from '@modules/navigation/navigation.module';
import { TripRoutingModule } from '@modules/trip-routing.module';

@NgModule({
	declarations: [
		SearchTripsComponent,
	],
	imports: [
		AutocompleteModule,
		CardModule,
		NavigationModule,
		ReactiveFormsModule,
		TripRoutingModule,
	],
})
export class TripModule { }
