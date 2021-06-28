import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { MessageService } from '@services/message.service';
import { Message } from '@models/message.type';
import { Column } from '@models/column.type';

@Component({
	selector: 'cb-messages',
	templateUrl: './messages.component.html',
	styleUrls: ['./messages.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessagesComponent implements OnInit {
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

	constructor(private messageService: MessageService) { }

	ngOnInit(): void {
		this.messages$ = this.messageService.getMessages();
	}
}
