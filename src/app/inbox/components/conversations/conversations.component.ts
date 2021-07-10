import {
	Component,
	ChangeDetectionStrategy,
	Input,
	SimpleChanges,
	OnChanges, 
} from '@angular/core';

import { constants, Constants } from '@constants/constants';
import { Column } from '@models/column.type';
import { Conversation } from '@models/conversation.model';
import { ConversationData } from '@models/conversation-data.model';
import { AuthorizationService } from '@services/authorization.service';
import { ConversationService } from '@services/conversation.service';
import { ConversationStoreService } from '@services/conversation-store.service';

@Component({
	selector: 'cb-conversations',
	templateUrl: './conversations.component.html',
	styleUrls: ['./conversations.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConversationsComponent implements OnChanges {
	@Input() conversations: Conversation[];
	@Input() selectedConversation: Conversation | null;

	data: ConversationData[];

	readonly constants: Constants = constants;
	readonly columns: Column[] = [
		{
			name: 'contact',
			label: 'Contact',
		},
		{
			name: 'message',
			label: 'Message',
		},
		{
			name: 'dateTime',
			label: 'Date/Time',
		},
	];

	constructor(
		private authorizationService: AuthorizationService,
		private conversationService: ConversationService,
		private conversationStore: ConversationStoreService,
	) { }

	ngOnChanges(changes: SimpleChanges): void {
		const conversations = changes.conversations?.currentValue;
		const selectedConversation = changes.selectedConversation?.currentValue;

		if (conversations) {
			this.populateData(conversations);
		}

		if (selectedConversation) {
			this.markAsRead(selectedConversation);
		}
	}

	selectConversation(conversationId: string): void {
		if (this.selectedConversation?.id !== conversationId) {
			this.conversationStore.selectConversation(conversationId);
		}
	}

	private populateData(conversations: Conversation[]): void {
		this.data = conversations.map((conversation: Conversation) => new ConversationData(
			this.authorizationService.currentUserId, conversation,
		));
	}

	private markAsRead(conversation: Conversation): void {
		if (this.conversationStore.isStatusUnread(conversation.id)) {
			this.conversationService.markAsRead(conversation.id)
				.subscribe(() => this.conversationStore.markAsRead(conversation.id));
		}
	}
}
