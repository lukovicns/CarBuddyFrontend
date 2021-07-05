import {
	Component,
	ChangeDetectionStrategy,
	OnInit,
	Input,
} from '@angular/core';

import { Observable } from 'rxjs';

import { Column } from '@models/column.type';
import { ConversationData } from '@models/conversation-data.model';
import { Conversation } from '@models/conversation.model';
import { MessageStoreService } from '@services/message-store.service';
import { toInstances } from '@shared/functions';

@Component({
	selector: 'cb-conversations',
	templateUrl: './conversations.component.html',
	styleUrls: ['./conversations.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConversationsComponent implements OnInit {
	@Input() conversations: Conversation[];

	selectedConversationId$: Observable<string>;
	conversationData: ConversationData[];

	readonly columns: Column[] = [
		{
			name: 'from',
			label: 'From',
		},
		{
			name: 'content',
			label: 'Content',
		},
		{
			name: 'dateTime',
			label: 'Date/Time',
		},
	];

	constructor(public messageStore: MessageStoreService) {
		this.selectedConversationId$ = this.messageStore.selectedConversationId$;
	}

	ngOnInit(): void {
		this.conversationData = toInstances(ConversationData, this.conversations);
	}
}
