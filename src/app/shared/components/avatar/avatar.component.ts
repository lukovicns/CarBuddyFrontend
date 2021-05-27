import {
	Component,
	ChangeDetectionStrategy,
	Input,
	OnInit,
} from '@angular/core';

import { avatarUrl } from '@constants/default-values';

@Component({
	selector: 'cb-avatar',
	templateUrl: './avatar.component.html',
	styleUrls: ['./avatar.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AvatarComponent implements OnInit {
	@Input() imageAlt = 'CarBuddy';
	@Input() image: string;

	avatarImage: string;

	ngOnInit(): void {
		this.avatarImage = this.image || avatarUrl;
	}
}
