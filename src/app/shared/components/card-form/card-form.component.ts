import { FormGroup } from '@angular/forms';
import {
	Component,
	ChangeDetectionStrategy,
	Input,
	Output,
	EventEmitter,
} from '@angular/core';

@Component({
	selector: 'cb-card-form',
	templateUrl: './card-form.component.html',
	styleUrls: ['./card-form.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardFormComponent {
	@Input() form: FormGroup;
	@Input() header: string;
	@Input() subheader: string;

	@Output() onSubmit = new EventEmitter<void>();
}
