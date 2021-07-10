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
import { ConversationStoreService } from '@services/conversation-store.service';

@Component({
	selector: 'cb-conversations',
	templateUrl: './conversations.component.html',
	styleUrls: ['./conversations.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConversationsComponent implements OnChanges {
	@Input() conversations: Conversation[];
	@Input() selectedConversation: string | null;

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
		public conversationStore: ConversationStoreService,
	) { }

	ngOnChanges(changes: SimpleChanges): void {
		const conversations = changes.conversations?.currentValue;
		if (conversations) {
			this.data = conversations.map((conversation: Conversation) => new ConversationData(
				this.authorizationService.currentUserId, conversation,
			));
		}
	}
}
