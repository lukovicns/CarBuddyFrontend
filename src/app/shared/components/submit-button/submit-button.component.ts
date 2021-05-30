import { Component, Input } from '@angular/core';

@Component({
	selector: 'cb-submit-button',
	templateUrl: './submit-button.component.html',
	styleUrls: [],
})
export class SubmitButtonComponent {
	@Input() label: string;
}
