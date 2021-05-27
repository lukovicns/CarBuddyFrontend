import {
	Component,
	ChangeDetectionStrategy,
	Output,
	EventEmitter,
} from '@angular/core';

@Component({
	selector: 'cb-star-rating',
	templateUrl: './star-rating.component.html',
	styleUrls: ['./star-rating.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StarRatingComponent {
	@Output() onRate = new EventEmitter<number>();

	ratings = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1];
}
