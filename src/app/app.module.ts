import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MAT_TOOLTIP_DEFAULT_OPTIONS } from '@angular/material/tooltip';

import { AgmCoreModule } from '@agm/core';

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
		AgmCoreModule.forRoot({
			apiKey: 'AIzaSyD2VUNllokT2MYaY6COgPAPTrw1Zj1-Irg',
			libraries: ['places'],
		}),
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
