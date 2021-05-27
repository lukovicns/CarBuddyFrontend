import { AbstractControl, FormGroup } from '@angular/forms';
import {
	Component,
	ChangeDetectionStrategy,
	OnInit,
	Output,
	EventEmitter,
	Input,
} from '@angular/core';

import { Observable } from 'rxjs';

import { constants, Constants } from '@constants/constants';
import { textControl } from '@constants/form-controls';
import { RatingStoreService } from '@services/rating-store.service';

@Component({
	selector: 'cb-driver-rating',
	templateUrl: './driver-rating.component.html',
	styleUrls: ['./driver-rating.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DriverRatingComponent implements OnInit {
	@Input() firstName: string;
	@Output() onSubmit = new EventEmitter<any>();

	isPending$: Observable<boolean>;
	form: FormGroup;
	evaluation = 0;

	readonly constants: Constants = constants;

	constructor(private ratingStore: RatingStoreService) {
		this.isPending$ = this.ratingStore.isRatingPending$;
	}

	ngOnInit(): void {
		this.form = new FormGroup({
			comment: textControl('', 0, 512),
		});
	}

	rate(evaluation: number): void {
		this.evaluation = evaluation;
	}

	save(): void {
		this.onSubmit.emit({
			comment: this.comment.value,
			evaluation: this.evaluation,
		});
	}

	get comment(): AbstractControl {
		return this.form.get('comment')!;
	}
}
