import { Component, Input } from '@angular/core';

@Component({
	selector: 'cb-card',
	templateUrl: './card.component.html',
	styleUrls: ['./card.component.scss'],
})
export class CardComponent {
	@Input() header: string;
	@Input() subheader: string;
	@Input() imageUrl: string;
	@Input() imageAlt: string;
}
