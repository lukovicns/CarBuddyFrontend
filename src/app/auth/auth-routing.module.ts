import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ConfirmEmailComponent } from '@components/confirm-email/confirm-email.component';
import { LoginComponent } from '@components/login/login.component';
import { RegisterComponent } from '@components/register/register.component';
import { AnonymousGuard } from '@guards/anonymous.guard';

const routes: Routes = [
	{
		path: 'login',
		component: LoginComponent,
		canActivate: [AnonymousGuard],
	},
	{
		path: 'register',
		component: RegisterComponent,
		canActivate: [AnonymousGuard],
	},
	{
		path: 'confirm-email',
		component: ConfirmEmailComponent,
		canActivate: [AnonymousGuard],
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class AuthRoutingModule { }
