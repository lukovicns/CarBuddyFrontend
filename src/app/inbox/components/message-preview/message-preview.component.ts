import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

import { Message } from '@models/message.model';
import { AuthorizationService } from '@services/authorization.service';

@Component({
	selector: 'cb-message-preview',
	templateUrl: './message-preview.component.html',
	styleUrls: ['./message-preview.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessagePreviewComponent {
	@Input() messages: Message[];

	currentUserId: string;

	constructor(private authorizationService: AuthorizationService) {
		this.currentUserId = this.authorizationService.currentUserId;
	}
}
