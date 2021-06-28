import { Injectable } from '@angular/core';

import { Message } from '@models/message.model';
import { MessageState } from '@states/message.state';
import { Store } from '@store/store';

@Injectable({
	providedIn: 'root',
})
export class MessageStoreService extends Store<MessageState> {
	selectedMessage$ = this.select((state: MessageState) => state.selectedMessage);

	constructor() {
		super({
			selectedMessage: Message.empty,
		});
	}

	setSelectedMessage(selectedMessage: Message): void {
		this.setState({ selectedMessage });
	}

	clearSelectedMessage(): void {
		this.setState({ selectedMessage: Message.empty });
	}
}
