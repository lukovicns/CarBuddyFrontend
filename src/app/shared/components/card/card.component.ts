import { Component, Input } from '@angular/core';

@Component({
	selector: 'cb-card',
	templateUrl: './card.component.html',
	styleUrls: ['./card.component.scss'],
})
export class CardComponent {
	@Input() imageUrl: string;
	@Input() imageAlt: string;
}
