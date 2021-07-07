import {
	Component,
	ChangeDetectionStrategy,
	Input,
	OnInit,
} from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';

import { constants, Constants } from '@constants/constants';
import { ChatMessage } from '@models/chat-message.model';
import { AuthorizationService } from '@services/authorization.service';
import { ChatService } from '@services/chat.service';

@Component({
	selector: 'cb-message-preview',
	templateUrl: './message-preview.component.html',
	styleUrls: ['./message-preview.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessagePreviewComponent implements OnInit {
	@Input() messages: ChatMessage[];

	form: FormGroup;
	currentUserId: string;

	readonly constants: Constants = constants;

	constructor(
		private authorizationService: AuthorizationService,
		private chatService: ChatService,
	) {
		this.currentUserId = this.authorizationService.currentUserId;
	}

	ngOnInit(): void {
		this.form = new FormGroup({
			message: new FormControl(''),
		});
	}

	send(): void {
		const message = this.message.value.trim();

		if (!message) {
			return;
		}

		// this.chatService.broadcastMessage({
		// 	conversationId: this.conversationId,
		// 	senderId: this.currentUserId,
		// 	message,
		// }).subscribe(() => this.form.reset());
	}

	get message(): AbstractControl {
		return this.form.get('message')!;
	}
}
