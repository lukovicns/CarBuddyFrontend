import { AbstractControl, FormGroup } from '@angular/forms';
import {
	Component,
	ChangeDetectionStrategy,
	Input,
	OnInit,
	ViewChild,
	ElementRef,
	AfterViewInit, 
} from '@angular/core';

import { getFormControlName } from '@shared/functions';

@Component({
	selector: 'cb-textarea',
	templateUrl: './textarea.component.html',
	styleUrls: ['./textarea.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextareaComponent implements OnInit, AfterViewInit {
	@Input() form: FormGroup;
	@Input() control: AbstractControl;
	@Input() label: string;
	@Input() placeholder: string;

	@ViewChild('textarea') textarea: ElementRef;

	formControlName: string;

	ngOnInit(): void {
		this.formControlName = getFormControlName(this.control);
	}

	ngAfterViewInit(): void {
		this.control.valueChanges
			.subscribe(() => {
				var scrollHeight = this.textarea.nativeElement.scrollHeight;
				this.textarea.nativeElement.style.height = `${scrollHeight}px`;
			});
	}
}
