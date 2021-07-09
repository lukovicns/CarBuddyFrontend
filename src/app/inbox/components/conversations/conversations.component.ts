import {
	Component,
	ChangeDetectionStrategy,
	Input,
	OnInit, 
} from '@angular/core';

import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { constants, Constants } from '@constants/constants';
import { Column } from '@models/column.type';
import { Conversation } from '@models/conversation.model';
import { ConversationData } from '@models/conversation-data.model';
import { ConversationStoreService } from '@services/conversation-store.service';
import { ConversationService } from '@services/conversation.service';
import { toInstances } from '@shared/functions';

@Component({
	selector: 'cb-conversations',
	templateUrl: './conversations.component.html',
	styleUrls: ['./conversations.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConversationsComponent implements OnInit {
	@Input() selectedConversation: string | null;

	conversations$: Observable<Conversation[] | null>;
	data$: Observable<ConversationData[]>;

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
		public conversationStore: ConversationStoreService,
		private conversationService: ConversationService,
	) {
		this.conversations$ = this.conversationStore.conversations$;
		this.data$ = this.conversations$
			.pipe(
				switchMap((conversations: Conversation[] | null) => of(
					toInstances(
						ConversationData,
						conversations || [],
					),
				)),
			);
	}

	ngOnInit(): void {
		this.conversationService.getConversations()
			.subscribe((conversations: Conversation[]) => {
				if (conversations.length) {
					this.conversationStore.selectConversation(conversations[0].id);
				}
			});
	}
}
