import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
	selector: 'cb-submit-icon-button',
	templateUrl: './submit-icon-button.component.html',
	styleUrls: ['./submit-icon-button.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SubmitIconButtonComponent {
	@Input() icon: string;
	@Input() tooltip: string;
	@Input() isDisabled = false;
}
