import {
	Component,
	ChangeDetectionStrategy,
	Input,
	Output,
	EventEmitter,
} from '@angular/core';

@Component({
	selector: 'cb-icon-button',
	templateUrl: './icon-button.component.html',
	styleUrls: ['./icon-button.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconButtonComponent {
	@Input() icon: string;
	@Input() tooltip: string;
	@Input() isDisabled = false;
	@Input() type = 'button';

	@Output() onClick = new EventEmitter<void>();
}
