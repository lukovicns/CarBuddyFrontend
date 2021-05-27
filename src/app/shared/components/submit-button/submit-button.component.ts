import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { Constants, constants } from '@constants/constants';

@Component({
	selector: 'cb-submit-button',
	templateUrl: './submit-button.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
	styleUrls: ['./submit-button.component.scss'],
})
export class SubmitButtonComponent {
	@Input() label: string;
	@Input() isDisabled = false;
	@Input() isPending = false;

	readonly constants: Constants = constants;
}
