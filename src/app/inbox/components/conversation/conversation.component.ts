import { FormGroup } from '@angular/forms';
import {
	Component,
	ChangeDetectionStrategy,
	Input,
	SimpleChanges,
	OnChanges,
	ViewChild,
	ElementRef,
	AfterViewChecked,
} from '@angular/core';

import { Observable } from 'rxjs';

import { ChatMessage } from '@models/chat-message.model';
import { Conversation } from '@models/conversation.model';
import { MessageParticipant } from '@models/message-participant.model';
import { MessageService } from '@services/message.service';
import { MessageStoreService } from '@services/message-store.service';
import { findById } from '@shared/functions';

@Component({
	selector: 'cb-conversation',
	templateUrl: './conversation.component.html',
	styleUrls: ['./conversation.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConversationComponent implements OnChanges, AfterViewChecked {
	@Input() selectedConversation: string;
	@Input() conversations: Conversation[];

	@ViewChild('scrollableCard', { read: ElementRef }) scrollableCard: ElementRef;

	messages$: Observable<ChatMessage[] | null>;
	recipient: MessageParticipant;

	form: FormGroup;

	constructor(
		private messageService: MessageService,
		private messageStore: MessageStoreService,
	) {
		this.messages$ = this.messageStore.messages$;
	}

	ngOnChanges(changes: SimpleChanges): void {
		const selectedConversation = changes.selectedConversation?.currentValue;

		if (selectedConversation && this.conversations) {
			this.recipient = findById(this.conversations, selectedConversation).participant;
			this.messageService.getMessages(selectedConversation)
				.subscribe();
		}
	}

	ngAfterViewChecked(): void {
		this.scrollToBottom(this.scrollableCard?.nativeElement);
	}

	private scrollToBottom(element: HTMLElement): void {
		if (element) {
			const matCard = element.querySelector('mat-card > mat-card-content')!;
			matCard.scrollTo({
				left: 0,
				top: matCard.scrollHeight,
			});
		}
	}
}
