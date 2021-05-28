import { Component, Input } from '@angular/core';

@Component({
	selector: 'cb-submit-button',
	templateUrl: './submit-button.component.html',
	styleUrls: ['./submit-button.component.scss'],
})
export class SubmitButtonComponent {
	@Input() label: string;
}
