import {
	Component,
	EventEmitter,
	Input,
	Output,
} from '@angular/core';

@Component({
	selector: 'cb-card',
	templateUrl: './card.component.html',
	styleUrls: ['./card.component.scss'],
})
export class CardComponent {
	@Input() imageUrl: string;
	@Input() imageAlt: string;
	@Output() onScrollTop = new EventEmitter<void>();

	onScroll(event: Event): void {
		if (this.isTopScroll(event.target as HTMLElement)) {
			this.onScrollTop.emit();
		}
	}

	private isTopScroll(element: HTMLElement): boolean {
		return element && element.scrollTop === 0;
	}
}
