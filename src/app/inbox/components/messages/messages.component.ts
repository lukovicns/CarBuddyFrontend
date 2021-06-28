import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { Column } from '@models/column.type';
import { Message } from '@models/message.model';
import { MessageStoreService } from '@services/message-store.service';
import { MessageService } from '@services/message.service';

@Component({
	selector: 'cb-messages',
	templateUrl: './messages.component.html',
	styleUrls: ['./messages.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessagesComponent implements OnInit {
	selectedMessage$: Observable<Message>;
	messages$: Observable<Message[]>;

	readonly columns: Column[] = [
		{
			name: 'from',
			label: 'From',
		},
		{
			name: 'title',
			label: 'Title',
		},
		{
			name: 'content',
			label: 'Content',
		},
		{
			name: 'date',
			label: 'Date',
		},
	];

	constructor(
		public messageStore: MessageStoreService,
		private messageService: MessageService,
	) {
		this.selectedMessage$ = this.messageStore.selectedMessage$;
	}

	ngOnInit(): void {
		this.messages$ = this.messageService.getInboxMessages();
	}
}
