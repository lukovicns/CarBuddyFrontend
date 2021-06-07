import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
	selector: 'cb-icon-button',
	templateUrl: './icon-button.component.html',
	styleUrls: ['./icon-button.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconButtonComponent {
	@Input() icon: string;
	@Input() tooltip: string;
}
