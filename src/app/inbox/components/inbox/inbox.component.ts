import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { Conversation } from '@models/conversation.model';
import { MessageService } from '@services/message.service';
import { MessageStoreService } from '@services/message-store.service';

@Component({
	selector: 'cb-inbox',
	templateUrl: './inbox.component.html',
	styleUrls: ['./inbox.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InboxComponent implements OnInit {
	conversations$: Observable<Conversation[] | null>;

	constructor(
		private messageService: MessageService,
		private messageStore: MessageStoreService,
	) {
		this.conversations$ = this.messageStore.conversations$;
	}

	ngOnInit(): void {
		this.messageService.getConversations()
			.subscribe();
	}
}
