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
import {
	filter,
	map,
	switchMap,
	takeUntil,
} from 'rxjs/operators';

import { constants, Constants } from '@constants/constants';
import { ChatMessage } from '@models/chat-message.model';
import { Conversation } from '@models/conversation.model';
import { User } from '@models/user.model';
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
	recipient = User.empty;

	form: FormGroup;

	readonly constants: Constants = constants;

	private destroy$ = new Subject<void>();
	private scrollableContentLoaded = false;

	constructor(
		private messageService: MessageService,
		private messageStore: MessageStoreService,
	) {
		this.messages$ = this.messageStore.messages$;
	}

	ngOnChanges(changes: SimpleChanges): void {
		const conversation = changes.selectedConversation?.currentValue;

		if (conversation) {
			this.handleConversationChanged(conversation);
		}
	}

	ngAfterViewInit(): void {
		this.updateMessagesOnScroll();
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

	private updateMessagesOnScroll(): void {
		fromEvent(this.scrollableContent.nativeElement as HTMLElement, 'scroll')
			.pipe(
				map((event: Event) => event.target as HTMLElement),
				filter((element: HTMLElement) => element.scrollTop === 0),
				switchMap(() => this.messageService.appendMessages(this.selectedConversation.id)),
				takeUntil(this.destroy$),
			)
			.subscribe();
	}

	private scrollToBottom(element: HTMLElement): void {
		element.scrollTo({
			left: 0,
			top: element.scrollHeight,
		});
	}
}
