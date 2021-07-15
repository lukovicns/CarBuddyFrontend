import { FormGroup } from '@angular/forms';
import {
	Component,
	ChangeDetectionStrategy,
	Input,
	SimpleChanges,
	OnChanges,
	ViewChild,
	ElementRef,
	AfterViewInit,
	OnDestroy,
	AfterViewChecked,
} from '@angular/core';

import { fromEvent, Observable, Subject } from 'rxjs';
import { filter, map, takeUntil } from 'rxjs/operators';

import { constants, Constants } from '@constants/constants';
import { ChatMessage } from '@models/chat-message.model';
import { MessageParticipant } from '@models/message-participant.model';
import { Conversation } from '@models/conversation.model';
import { MessageService } from '@services/message.service';
import { MessageStoreService } from '@services/message-store.service';

@Component({
	selector: 'cb-conversation',
	templateUrl: './conversation.component.html',
	styleUrls: ['./conversation.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConversationComponent implements OnChanges, AfterViewInit, AfterViewChecked, OnDestroy {
	@Input() selectedConversation: Conversation;
	@ViewChild('scrollableContent') scrollableContent: ElementRef;

	messages$: Observable<ChatMessage[] | null>;
	isLoading$: Observable<boolean>;
	recipient: MessageParticipant;

	form: FormGroup;

	readonly constants: Constants = constants;

	private destroy$ = new Subject<void>();
	private scrollableContentLoaded = false;

	constructor(
		private messageService: MessageService,
		private messageStore: MessageStoreService,
	) {
		this.messages$ = this.messageStore.messages$;
		this.isLoading$ = this.messageStore.isLoadingMessages$;
	}

	ngOnChanges(changes: SimpleChanges): void {
		const conversation = changes.selectedConversation?.currentValue;

		if (conversation) {
			this.handleConversationChanged(conversation);
		}
	}

	ngAfterViewInit(): void {
		this.appendMessagesOnScroll();
	}

	ngAfterViewChecked(): void {
		if (!this.scrollableContentLoaded) {
			this.scrollToBottom(this.scrollableContent.nativeElement);
			this.scrollableContentLoaded = true;
		}
	}

	ngOnDestroy(): void {
		this.destroy$.next();
		this.destroy$.complete();
	}

	private handleConversationChanged(conversation: Conversation): void {
		this.recipient = conversation.participant;
		this.messageStore.resetPageNumber();
		this.messageService.getMessages(conversation.id)
			.subscribe();
	}

	private appendMessagesOnScroll(): void {
		fromEvent(this.scrollableContent.nativeElement as HTMLElement, 'scroll')
			.pipe(
				map((event: Event) => event.target as HTMLElement),
				filter((element: HTMLElement) => element.scrollTop === 0),
				takeUntil(this.destroy$),
			)
			.subscribe(() => {
				this.messageService.appendMessages(this.selectedConversation.id)
					.subscribe();
			});
	}

	private scrollToBottom(element: HTMLElement): void {
		element.scrollTo({
			left: 0,
			top: element.scrollHeight,
		});
	}
}
