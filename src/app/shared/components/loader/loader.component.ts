import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
	selector: 'cb-loader',
	templateUrl: './loader.component.html',
	styleUrls: ['./loader.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoaderComponent { }
