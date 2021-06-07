import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
	selector: 'cb-driver-info',
	templateUrl: './driver-info.component.html',
	styleUrls: ['./driver-info.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DriverInfoComponent {
	@Input() firstName: string;
	@Input() rating: number;
}
