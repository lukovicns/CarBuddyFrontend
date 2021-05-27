import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SearchTripsComponent } from '@components/search-trips/search-trips.component';
import { AddTripComponent } from '@components/add-trip/add-trip.component';
import { TripComponent } from '@components/trip/trip.component';
import { TripsComponent } from '@components/trips/trips.component';
import { MyTripsComponent } from '@components/my-trips/my-trips.component';
import { DriverProfileComponent } from '@components/driver-profile/driver-profile.component';
import { TripRequestsComponent } from '@components/trip-requests/trip-requests.component';
import { AuthenticatedGuard } from '@guards/authenticated.guard';

const routes: Routes = [
	{
		path: 'search',
		component: SearchTripsComponent,
		canActivate: [AuthenticatedGuard],
	},
	{
		'path': 'trips/add',
		component: AddTripComponent,
		canActivate: [AuthenticatedGuard],
	},
	{
		path: 'trips',
		component: TripsComponent,
		canActivate: [AuthenticatedGuard],
	},
	{
		path: 'trips/:id',
		component: TripComponent,
		canActivate: [AuthenticatedGuard],
	},
	{
		path: 'my-trips',
		component: MyTripsComponent,
		canActivate: [AuthenticatedGuard],
	},
	{
		path: 'trip-requests',
		component: TripRequestsComponent,
		canActivate: [AuthenticatedGuard],
	},
	{
		path: 'drivers/:id',
		component: DriverProfileComponent,
		canActivate: [AuthenticatedGuard],
	},
	{
		path: '',
		redirectTo: 'search',
		pathMatch: 'full',
	},
	{
		path: '**',
		redirectTo: 'search',
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class TripRoutingModule { }
