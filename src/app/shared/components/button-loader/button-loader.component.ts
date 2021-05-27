import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
	selector: 'cb-button-loader',
	templateUrl: './button-loader.component.html',
	styleUrls: ['./button-loader.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonLoaderComponent { }
