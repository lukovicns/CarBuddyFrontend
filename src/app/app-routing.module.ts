import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
	{
		path: 'auth',
		loadChildren: () => import('@modules/auth.module').then((m) => m.AuthModule),
	},
	{
		path: 'inbox',
		loadChildren: () => import('@modules/inbox.module').then((m) => m.InboxModule),
	},
	{
		path: '',
		loadChildren: () => import('@modules/trip.module').then((m) => m.TripModule),
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],   
	exports: [RouterModule],
})
export class AppRoutingModule { }
