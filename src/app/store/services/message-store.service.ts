import { Injectable } from '@angular/core';

import { MessageState } from '@states/message.state';
import { Store } from '@store/store';

@Injectable({
	providedIn: 'root',
})
export class MessageStoreService extends Store<MessageState> {
	selectedMessageId$ = this.select((state: MessageState) => state.selectedMessageId);

	constructor() {
		super({
			selectedMessageId: '',
		});
	}

	setSelectedMessage(selectedMessageId: string): void {
		this.setState({ selectedMessageId });
	}

	clearSelectedMessage(): void {
		this.setState({ selectedMessageId: '' });
	}
}
