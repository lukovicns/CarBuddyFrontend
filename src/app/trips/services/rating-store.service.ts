import { Injectable } from '@angular/core';

import { RatingState } from '@states/rating.state';
import { Store } from '@store/store';

@Injectable({
	providedIn: 'root',
})
export class RatingStoreService extends Store<RatingState> {
	isRatingPending$ = this.select((state: RatingState) => state.isRatingPending);

	constructor() {
		super({
			isRatingPending: false,
		});
	}

	setPending(isPending: boolean): void {
		this.setState({ isRatingPending: isPending });
	}
}
