import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SearchTripsComponent } from '@components/search-trips/search-trips.component';
import { AddTripComponent } from '@components/add-trip/add-trip.component';
import { TripComponent } from '@components/trip/trip.component';
import { TripsComponent } from '@components/trips/trips.component';
import { HistoryComponent } from '@components/history/history.component';
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
		path: 'history',
		component: HistoryComponent,
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
