import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
	selector: 'cb-progress-bar',
	templateUrl: './progress-bar.component.html',
	styleUrls: ['./progress-bar.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProgressBarComponent { }
