import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AutocompleteModule } from '@components/autocomplete/autocomplete.module';
import { CardModule } from '@components/card/card.module';
import { SearchTripsComponent } from '@components/search-trips/search-trips.component';
import { NavigationModule } from '@components/navigation/navigation.module';
import { SubmitButtonModule } from '@components/submit-button/submit-button.module';
import { NumberFormFieldModule } from '@form-field/number-form-field/number-form-field.module';
import { TripRoutingModule } from '@modules/trip-routing.module';

@NgModule({
	declarations: [
		SearchTripsComponent,
	],
	imports: [
		AutocompleteModule,
		CardModule,
		CommonModule,
		NavigationModule,
		NumberFormFieldModule,
		ReactiveFormsModule,
		SubmitButtonModule,
		TripRoutingModule,
	],
})
export class TripModule { }
