import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { InboxComponent } from '@components/inbox/inbox.component';
import { AuthenticatedGuard } from '@guards/authenticated.guard';

const routes: Routes = [
	{
		path: '',
		component: InboxComponent,
		canActivate: [AuthenticatedGuard],
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],   
	exports: [RouterModule],
})
export class InboxRoutingModule { }
