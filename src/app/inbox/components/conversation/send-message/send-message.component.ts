import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import {
	Component,
	ChangeDetectionStrategy,
	Input,
	OnInit,
} from '@angular/core';

import { Observable } from 'rxjs';

import { constants, Constants } from '@constants/constants';
import { ChatMessage } from '@models/chat-message.model';
import { Conversation } from '@models/conversation.model';
import { AuthorizationService } from '@services/authorization.service';
import { ChatService } from '@services/chat.service';
import { MessageStoreService } from '@services/message-store.service';

@Component({
	selector: 'cb-send-message',
	templateUrl: './send-message.component.html',
	styleUrls: ['./send-message.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SendMessageComponent implements OnInit {
	@Input() conversationId: string;
	@Input() participantId: string;
	@Input() isSendingDisabled = false;

	form: FormGroup;
	isPending$: Observable<boolean>;

	readonly constants: Constants = constants;

	constructor(
		private authorizationService: AuthorizationService,
		private chatService: ChatService,
		private messageStore: MessageStoreService,
	) {
		this.isPending$ = this.messageStore.isPending$;
	}

	ngOnInit(): void {
		this.form = new FormGroup({
			message: new FormControl(''),
		});
	}

	send(): void {
		const message: string = this.control.value.trim();

		if (message) {
			this.sendMessage(message);
		}
	}

	get control(): AbstractControl {
		return this.form.get('message')!;
	}

	private sendMessage(message: string): void {
		this.chatService.sendMessage(
			this.conversationId,
			message,
			this.participantId,
		).subscribe((data: { conversation: Conversation; message: ChatMessage }) => {
			if (this.authorizationService.isCurrentUser(data.message.authorId)) {
				this.messageStore.appendMessage(data.message);
			}

			this.form.reset();
		});
	}
}
