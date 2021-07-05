import {
	Component,
	ChangeDetectionStrategy,
	OnInit,
	Input,
	Output,
	EventEmitter,
} from '@angular/core';

import { Column } from '@models/column.type';
import { ConversationData } from '@models/conversation-data.model';
import { Conversation } from '@models/conversation.model';
import { toInstances } from '@shared/functions';

@Component({
	selector: 'cb-conversations',
	templateUrl: './conversations.component.html',
	styleUrls: ['./conversations.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConversationsComponent implements OnInit {
	@Input() conversations: Conversation[];
	@Input() selectedConversationId: string;

	@Output() onSelect = new EventEmitter<string>();

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

	ngOnInit(): void {
		this.conversationData = toInstances(ConversationData, this.conversations);
	}
}
