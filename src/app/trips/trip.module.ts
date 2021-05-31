import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

import { CardModule } from '@components/card/card.module';
import { PlacesAutocompleteModule } from '@components/places-autocomplete/places-autocomplete.module';
import { SearchTripsComponent } from '@components/search-trips/search-trips.component';
import { NavigationModule } from '@components/navigation/navigation.module';
import { SubmitButtonModule } from '@components/submit-button/submit-button.module';
import { TripsComponent } from '@components/trips/trips.component';
import { TripComponent } from '@components/trips/trip/trip.component';
import { DatePickerModule } from '@components/date-picker/date-picker.module';
import { FormFieldModule } from '@form-field/form-field.module';
import { TripRoutingModule } from '@modules/trip-routing.module';

@NgModule({
	declarations: [
		SearchTripsComponent,
		TripsComponent,
		TripComponent,
	],
	imports: [
		CardModule,
		CommonModule,
		DatePickerModule,
		FormFieldModule,
		MatButtonModule,
		NavigationModule,
		PlacesAutocompleteModule,
		ReactiveFormsModule,
		SubmitButtonModule,
		TripRoutingModule,
	],
})
export class TripModule { }
