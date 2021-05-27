import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		loadChildren: () => import('./trips/trip.module').then((t) => t.TripModule),
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],   
	exports: [RouterModule],
})
export class AppRoutingModule { }
