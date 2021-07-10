import {
	Component,
	ChangeDetectionStrategy,
	OnDestroy,
	OnInit,
	ChangeDetectorRef, 
} from '@angular/core';

import { Observable, Subject } from 'rxjs';

import { Conversation } from '@models/conversation.model';
import { ConversationStoreService } from '@services/conversation-store.service';
import { MessageStoreService } from '@services/message-store.service';
import { ConversationService } from '@services/conversation.service';
import { takeUntil } from 'rxjs/operators';

@Component({
	selector: 'cb-inbox',
	templateUrl: './inbox.component.html',
	styleUrls: ['./inbox.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InboxComponent implements OnInit, OnDestroy {
	conversations$: Observable<Conversation[] | null>;
	selectedConversation: Conversation;

	private destroy$ = new Subject<void>();

	constructor(
		private cdRef: ChangeDetectorRef,
		private conversationService: ConversationService,
		private conversationStore: ConversationStoreService,
		private messageStore: MessageStoreService,
	) {
		this.conversations$ = this.conversationStore.conversations$;
		this.conversationStore.selectedConversation$
			.pipe(takeUntil(this.destroy$))
			.subscribe((conversation: Conversation | null) => {
				if (conversation) {
					this.selectedConversation = conversation;
					this.cdRef.markForCheck();
				}
			});
	}

	ngOnInit(): void {
		this.conversationService.getConversations()
			.pipe(takeUntil(this.destroy$))
			.subscribe((conversations: Conversation[]) => {
				if (conversations.length) {
					this.conversationStore.selectConversation(conversations[0].id);
				}
			});
	}

	ngOnDestroy(): void {
		this.messageStore.clearMessages();
		this.conversationStore.clearConversations();
		this.destroy$.next();
		this.destroy$.complete();
	}
}
