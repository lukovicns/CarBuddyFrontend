import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MAT_TOOLTIP_DEFAULT_OPTIONS } from '@angular/material/tooltip';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from '@app/app.component';
import { AppRoutingModule } from '@app/app-routing.module';
import { NavigationModule } from '@components/navigation/navigation.module';
import { AuthorizationInterceptor } from '@interceptors/authorization.interceptor';
import { InboxModule } from '@modules/inbox/inbox.module';

@NgModule({
	declarations: [
		AppComponent,
	],
	imports: [
		AppRoutingModule,
		BrowserAnimationsModule,
		BrowserModule,
		HttpClientModule,
		InboxModule,
		MatSnackBarModule,
		NavigationModule,
	],
	providers: [
		{
			provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
			useValue: { appearance: 'outline' },
		},
		{
			provide: MAT_TOOLTIP_DEFAULT_OPTIONS,
			useValue: { showDelay: 200 },
		},
		{
			provide: HTTP_INTERCEPTORS,
			useClass: AuthorizationInterceptor,
			multi: true,
		},
	],
	bootstrap: [AppComponent],
})
export class AppModule { }
