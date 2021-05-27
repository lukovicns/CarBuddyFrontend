import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgmCoreModule } from '@agm/core';
import { AgmDirectionModule } from 'agm-direction';

import { environment } from '@environment';
import { MapComponent } from './map.component';

@NgModule({
	declarations: [
		MapComponent,
	],
	imports: [
		CommonModule,
		AgmDirectionModule,
		AgmCoreModule.forRoot({
			apiKey: environment.mapsApiKey,
			libraries: ['drawing', 'places'],
			language: 'sr-Latn-RS',
		}),
	],
	exports: [
		MapComponent,
		AgmCoreModule,
	],
})
export class MapModule { }
