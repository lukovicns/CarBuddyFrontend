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
import { AuthorizationService } from '@services/authorization.service';
import { ChatService } from '@services/chat.service';
import { MessageService } from '@services/message.service';
import { MessageStoreService } from '@services/message-store.service';
import { tap } from 'rxjs/operators';

@Component({
	selector: 'cb-message-preview',
	templateUrl: './message-preview.component.html',
	styleUrls: ['./message-preview.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessagePreviewComponent implements OnInit, OnChanges {
	@Input() selectedConversation: string;

	messages$: Observable<ChatMessage[] | null>;
	isPending$: Observable<boolean>;

	form: FormGroup;
	currentUserId: string;

	readonly constants: Constants = constants;

	constructor(
		private authorizationService: AuthorizationService,
		private chatService: ChatService,
		private messageService: MessageService,
		private messageStore: MessageStoreService,
	) {
		this.messages$ = this.messageStore.messages$;
		this.isPending$ = this.messageStore.isPending$;
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

		if (message) {
			this.sendMessage(message);
		}
	}

	get messageControl(): AbstractControl {
		return this.form.get('message')!;
	}

	private sendMessage(message: string): void {
		this.messageStore.setPending(true);
		this.chatService.broadcastMessage(
			this.currentUserId,
			this.selectedConversation,
			message,
		).pipe(
			tap({
				complete: () => this.messageStore.setPending(false),
			}),
		).subscribe(() => this.form.reset());
	}
}
