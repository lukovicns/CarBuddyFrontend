import {
	ChangeDetectionStrategy,
	Component,
	EventEmitter,
	Input,
	Output,
} from '@angular/core';

import { Constants, constants } from '@constants/constants';

@Component({
	selector: 'cb-flat-button',
	templateUrl: './flat-button.component.html',
	styleUrls: ['./flat-button.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FlatButtonComponent {
	@Input() color = 'primary';
	@Input() isDisabled = false;
	@Input() isPending = false;

	@Output() onClick = new EventEmitter<void>();

	readonly constants: Constants = constants;
}
