import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';

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
import { TripActionsComponent } from '@components/trip/trip-actions/trip-actions.component';
import { MyTripsComponent } from '@components/my-trips/my-trips.component';
import { AddTripComponent } from '@components/add-trip/add-trip.component';
import { CardFormModule } from '@components/card-form/card-form.module';
import { NumberInputButtonsModule } from '@components/number-input-buttons/number-input-buttons.module';
import { AddCarDialogComponent } from '@components/add-trip/add-car-dialog/add-car-dialog.component';
import { AddCarComponent } from '@components/add-trip/add-car/add-car.component';
import { DropdownModule } from '@components/dropdown/dropdown.module';
import { TimePickerModule } from '@components/time-picker/time-picker.module';
import { EmptyResultWithLinkModule } from '@components/empty-result-with-link/empty-result-with-link.module';
import { TableModule } from '@components/table/table.module';
import { PaginatorModule } from '@components/paginator/paginator.module';
import { DriverProfileComponent } from '@components/driver-profile/driver-profile.component';
import { StarRatingModule } from '@components/star-rating/star-rating.module';
import { TextareaModule } from '@components/textarea/textarea.module';
import { DriverRatingComponent } from '@components/trip/driver-rating/driver-rating.component';
import { TripsCreatedByMeComponent } from '@components/my-trips/trips-created-by-me/trips-created-by-me.component';
import { HistoryComponent } from '@components/my-trips/history/history.component';
import { ReservationsComponent } from '@components/my-trips/reservations/reservations.component';
import { EditTripDialogComponent } from '@components/edit-trip-dialog/edit-trip-dialog.component';
import { ConfirmationDialogModule } from '@components/confirmation-dialog/confirmation-dialog.module';
import { ButtonLoaderModule } from '@components/button-loader/button-loader.module';
import { FormFieldModule } from '@form-field/form-field.module';
import { TripRoutingModule } from '@modules/trip-routing.module';
import { TableWithActionsModule } from '@components/table-with-actions/table-with-actions.module';
import { TripFormComponent } from '@components/trip-form/trip-form.component';
import { FlatButtonModule } from '@components/flat-button/flat-button.module';
import { SendMessageModule } from '@components/conversation/send-message/send-message.module';
import { TripRequestsComponent } from '@components/trip-requests/trip-requests.component';
import { EmptyResultModule } from '@components/empty-result/empty-result.module';
import { MapModule } from '@components/map/map.module';
import { DialogService } from '@services/dialog.service';

@NgModule({
	declarations: [
		AddCarComponent,
		AddCarDialogComponent,
		AddTripComponent,
		DriverInfoComponent,
		DriverProfileComponent,
		DriverRatingComponent,
		EditTripDialogComponent,
		HistoryComponent,
		MyTripsComponent,
		ReservationsComponent,
		SearchTripsComponent,
		TripActionsComponent,
		TripComponent,
		TripDetailsComponent,
		TripFormComponent,
		TripsComponent,
		TripsCreatedByMeComponent,
		TripRequestsComponent,
	],
	imports: [
		AvatarModule,
		ButtonLoaderModule,
		CardFormModule,
		CardModule,
		CommonModule,
		ConfirmationDialogModule,
		DatePickerModule,
		DropdownModule,
		EmptyResultModule,
		EmptyResultWithLinkModule,
		FlatButtonModule,
		FormFieldModule,
		IconButtonModule,
		MapModule,
		MatButtonModule,
		MatDialogModule,
		MatIconModule,
		MatIconModule,
		MatProgressBarModule,
		MatTabsModule,
		NavigationModule,
		NumberInputButtonsModule,
		PaginatorModule,
		PlacesAutocompleteModule,
		ProgressBarModule,
		ReactiveFormsModule,
		SendMessageModule,
		StarRatingModule,
		SubmitButtonModule,
		TableModule,
		TableWithActionsModule,
		TextareaModule,
		TimePickerModule,
		TripRoutingModule,
	],
	providers: [
		DialogService,
		{
			provide: MAT_DATE_FORMATS,
			useValue: {
				parse: {
					dateInput: 'DD/MM/YYYY',
				},
				display: {
					dateInput: 'DD/MM/YYYY',
					monthYearLabel: 'MMM YYYY',
					dateA11yLabel: 'LL',
					monthYearA11yLabel: 'MMM YYYY',
				},
			},
		},
		{
			provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS,
			useValue: { useUtc: true },
		},
	],
})
export class TripModule { }
