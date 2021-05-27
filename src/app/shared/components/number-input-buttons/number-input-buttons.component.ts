import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
	selector: 'cb-number-input-buttons',
	templateUrl: './number-input-buttons.component.html',
	styleUrls: ['./number-input-buttons.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NumberInputButtonsComponent {
	@Input() control: AbstractControl;
	@Input() label: string;
	@Input() min: number;
	@Input() max: number;
}
