import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SearchTripsComponent } from '@components/search-trips/search-trips.component';

const routes: Routes = [
	{
		path: '',
		component: SearchTripsComponent,
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],   
	exports: [RouterModule],
})
export class TripRoutingModule { }
