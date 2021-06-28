import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { Message } from '@models/message.model';
import { MessageStoreService } from '@services/message-store.service';
import { MessageService } from '@services/message.service';

@Component({
	selector: 'cb-message-preview',
	templateUrl: './message-preview.component.html',
	styleUrls: ['./message-preview.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessagePreviewComponent implements OnInit {
	messages$: Observable<Message[]>;

	constructor(
		private messageStore: MessageStoreService,
		private messageService: MessageService,
	) { }

	ngOnInit(): void {
		this.messageStore.selectedMessage$
			.subscribe((message: Message) => {
				this.messages$ = this.messageService.getChatMessages(message.recipientId);
			});
	}
}
