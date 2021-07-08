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
import { ConversationStoreService } from '@services/conversation-store.service';
import { MessageService } from '@services/message.service';
import { MessageStoreService } from '@services/message-store.service';

@Component({
	selector: 'cb-message-preview',
	templateUrl: './message-preview.component.html',
	styleUrls: ['./message-preview.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessagePreviewComponent implements OnChanges, AfterViewChecked {
	@Input() selectedConversation: string;
	@ViewChild('scrollableCard', { read: ElementRef }) scrollableCard: ElementRef;

	conversations$: Observable<Conversation[] | null>;
	messages$: Observable<ChatMessage[] | null>;

	form: FormGroup;

	constructor(
		private conversationStore: ConversationStoreService,
		private messageService: MessageService,
		private messageStore: MessageStoreService,
	) {
		this.conversations$ = this.conversationStore.conversations$;
		this.messages$ = this.messageStore.messages$;
	}

	ngOnChanges(changes: SimpleChanges): void {
		const selectedConversation = changes.selectedConversation?.currentValue;

		if (selectedConversation) {
			this.messageService.getMessages(selectedConversation)
				.subscribe();
		}
	}

	ngAfterViewChecked(): void {
		this.scrollToBottom(this.scrollableCard?.nativeElement);
	}

	private scrollToBottom(element: HTMLElement): void {
		if (element) {
			const matCard = element.querySelector('mat-card')!;
			matCard.scrollTo({
				left: 0,
				top: matCard.scrollHeight,
			});
		}
	}
}
