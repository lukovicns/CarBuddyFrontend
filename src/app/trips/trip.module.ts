import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { AvatarModule } from '@components/avatar/avatar.module';
import { CardModule } from '@components/card/card.module';
import { PlacesAutocompleteModule } from '@components/places-autocomplete/places-autocomplete.module';
import { SearchTripsComponent } from '@components/search-trips/search-trips.component';
import { NavigationModule } from '@components/navigation/navigation.module';
import { SubmitButtonModule } from '@components/submit-button/submit-button.module';
import { TripsComponent } from '@components/trips/trips.component';
import { TripComponent } from '@components/trip/trip.component';
import { ProgressBarModule } from '@components/progress-bar/progress-bar.module';
import { DatePickerModule } from '@components/date-picker/date-picker.module';
import { TripDetailsComponent } from '@components/trip-details/trip-details.component';
import { IconButtonModule } from '@components/icon-button/icon-button.module';
import { DriverInfoComponent } from '@components/driver-info/driver-info.component';
import { MakeReservationComponent } from '@components/trip/make-reservation/make-reservation.component';
import { HistoryComponent } from '@components/history/history.component';
import { AddTripComponent } from '@components/add-trip/add-trip.component';
import { CardFormModule } from '@components/card-form/card-form.module';
import { FormFieldModule } from '@form-field/form-field.module';
import { TripRoutingModule } from '@modules/trip-routing.module';
import { AddCarComponent } from './components/add-trip/add-car/add-car.component';

@NgModule({
	declarations: [
		SearchTripsComponent,
		TripsComponent,
		TripComponent,
		TripDetailsComponent,
		DriverInfoComponent,
		MakeReservationComponent,
		HistoryComponent,
		AddTripComponent,
		AddCarComponent,
	],
	imports: [
		AvatarModule,
		CardFormModule,
		CardModule,
		CommonModule,
		DatePickerModule,
		FormFieldModule,
		IconButtonModule,
		MatButtonModule,
		MatDialogModule,
		MatIconModule,
		MatPaginatorModule,
		NavigationModule,
		MatProgressBarModule,
		PlacesAutocompleteModule,
		ProgressBarModule,
		ReactiveFormsModule,
		SubmitButtonModule,
		TripRoutingModule,
	],
})
export class TripModule { }
