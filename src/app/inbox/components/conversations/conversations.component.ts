import {
	Component,
	ChangeDetectionStrategy,
	Input,
	SimpleChanges,
	OnChanges,
} from '@angular/core';

import { BehaviorSubject } from 'rxjs';

import { constants, Constants } from '@constants/constants';
import { Column } from '@models/column.type';
import { Conversation } from '@models/conversation.model';
import { ConversationData } from '@models/conversation-data.model';
import { AuthorizationService } from '@services/authorization.service';
import { ConversationService } from '@services/conversation.service';
import { ConversationStoreService } from '@services/conversation-store.service';
import { MessageStoreService } from '@services/message-store.service';
import { DropdownMenuItem } from '@models/dropdown-menu-item.type';
import { actions, columns } from './columns';

@Component({
	selector: 'cb-conversations',
	templateUrl: './conversations.component.html',
	styleUrls: ['./conversations.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConversationsComponent implements OnChanges {
	@Input() conversations: Conversation[];
	@Input() selectedConversation: Conversation | null;

	data$ = new BehaviorSubject<ConversationData[]>([]);
	actions: DropdownMenuItem[] = actions;

	readonly constants: Constants = constants;
	readonly columns: Column[] = columns;

	constructor(
		private authorizationService: AuthorizationService,
		private conversationService: ConversationService,
		private conversationStore: ConversationStoreService,
		private messageStore: MessageStoreService,
	) { }

	ngOnChanges(changes: SimpleChanges): void {
		if (changes.conversations && this.conversations) {
			this.populateData(this.conversations);
		}

		if (changes.selectedConversation && this.selectedConversation) {
			this.checkIfMarkedAsRead(this.selectedConversation.id);
		}
	}

	selectConversation(conversationId: string): void {
		if (this.selectedConversation?.id !== conversationId) {
			this.conversationStore.selectConversation(conversationId);
			this.checkIfMarkedAsRead(conversationId);
			this.messageStore.clearMessages();
		}
	}

	handleAction(action: { key: string; row: ConversationData }): void {
		if (action.key === 'delete') {
			this.conversationService.deleteConversation(action.row.id)
				.subscribe(() => this.conversationStore.selectNextConversation());
		}
	}

	private populateData(conversations: Conversation[]): void {
		this.data$.next(conversations.map((conversation: Conversation) =>
			new ConversationData(this.authorizationService.currentUserId, conversation),
		));
	}

	private checkIfMarkedAsRead(conversationId: string): void {
		if (this.conversationStore.isConversationUnread(conversationId)) {
			this.markAsRead(conversationId);
		}
	}

	private markAsRead(conversationId: string): void {
		this.conversationService.markAsRead(conversationId)
			.subscribe();
	}
}
