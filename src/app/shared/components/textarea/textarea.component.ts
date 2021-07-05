import { AbstractControl, FormGroup } from '@angular/forms';
import {
	Component,
	ChangeDetectionStrategy,
	Input,
	OnInit, 
} from '@angular/core';

import { getFormControlName } from '@shared/functions';

@Component({
	selector: 'cb-textarea',
	templateUrl: './textarea.component.html',
	styleUrls: ['./textarea.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextareaComponent implements OnInit {
	@Input() form: FormGroup;
	@Input() control: AbstractControl;
	@Input() label: string;
	@Input() placeholder: string;

	formControlName: string;

	ngOnInit(): void {
		this.formControlName = getFormControlName(this.control);
	}
}
