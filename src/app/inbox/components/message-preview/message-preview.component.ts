import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import {
	Component,
	ChangeDetectionStrategy,
	OnInit,
	Input,
	SimpleChanges,
	OnChanges, 
} from '@angular/core';

import { Observable } from 'rxjs';

import { constants, Constants } from '@constants/constants';
import { ChatMessage } from '@models/chat-message.model';
import { SentMessage } from '@models/sent-message.model';
import { AuthorizationService } from '@services/authorization.service';
import { ChatService } from '@services/chat.service';
import { MessageService } from '@services/message.service';
import { MessageStoreService } from '@services/message-store.service';

@Component({
	selector: 'cb-message-preview',
	templateUrl: './message-preview.component.html',
	styleUrls: ['./message-preview.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessagePreviewComponent implements OnInit, OnChanges {
	@Input() selectedConversation: string;

	messages$: Observable<ChatMessage[] | null>;
	form: FormGroup;
	currentUserId: string;

	readonly constants: Constants = constants;

	constructor(
		private authorizationService: AuthorizationService,
		private chatService: ChatService,
		private messageService: MessageService,
		private messageStoreService: MessageStoreService,
	) {
		this.messages$ = this.messageStoreService.messages$;
		this.currentUserId = this.authorizationService.currentUserId;
	}

	ngOnInit(): void {
		this.form = new FormGroup({
			message: new FormControl(''),
		});
	}

	ngOnChanges(changes: SimpleChanges): void {
		const selectedConversation = changes.selectedConversation?.currentValue;

		if (selectedConversation) {
			this.messageService.getMessages(selectedConversation)
				.subscribe();
		}
	}

	send(): void {
		const message: string = this.messageControl.value.trim();

		if (!message) {
			return;
		}

		this.chatService.broadcastMessage(
			new SentMessage({
				authorId: this.currentUserId,
				conversationId: this.selectedConversation,
				message,
			}),
		).subscribe(() => this.form.reset());
	}

	get messageControl(): AbstractControl {
		return this.form.get('message')!;
	}
}
