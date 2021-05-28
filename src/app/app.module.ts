import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AgmCoreModule } from '@agm/core';

import { AppComponent } from '@app/app.component';
import { AppRoutingModule } from '@app/app-routing.module';
import { NavigationModule } from '@components/navigation/navigation.module';

@NgModule({
	declarations: [
		AppComponent,
	],
	imports: [
		AppRoutingModule,
		BrowserAnimationsModule,
		BrowserModule,
		HttpClientModule,
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
	],
	bootstrap: [AppComponent],
})
export class AppModule { }
