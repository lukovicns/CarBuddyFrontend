import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

import { Conversation } from '@models/conversation.model';
import { ChatMessage } from '@models/chat-message.model';
import { AuthorizationService } from '@services/authorization.service';

@Component({
	selector: 'cb-message',
	templateUrl: './message.component.html',
	styleUrls: ['./message.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessageComponent {
	@Input() message: ChatMessage;
	@Input() selectedConversation: Conversation;
	@Input() previousMessage: ChatMessage | null;

	currentUserId: string;

	constructor(private authorizationService: AuthorizationService) {
		this.currentUserId = this.authorizationService.currentUserId;
	}

	get isRecipient(): boolean {
		return this.message.isRecipient(this.currentUserId);
	}
}
