import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SearchTripsComponent } from '@components/search-trips/search-trips.component';
import { TripComponent } from '@components/trips/trip/trip.component';
import { TripsComponent } from '@components/trips/trips.component';

const routes: Routes = [
	{
		path: '',
		redirectTo: 'search',
		pathMatch: 'full',
	},
	{
		path: 'search',
		component: SearchTripsComponent,
	},
	{
		path: 'trips',
		component: TripsComponent,
	},
	{
		path: 'trips/:id',
		component: TripComponent,
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
