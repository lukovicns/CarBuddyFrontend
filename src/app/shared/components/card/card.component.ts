import { Component, Input } from '@angular/core';

@Component({
	selector: 'cb-card',
	templateUrl: './card.component.html',
	styleUrls: [],
})
export class CardComponent {
	@Input() header: string;
	@Input() subheader: string;
}
