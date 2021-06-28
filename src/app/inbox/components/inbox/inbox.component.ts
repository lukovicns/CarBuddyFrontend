import { Component, ChangeDetectionStrategy } from '@angular/core';

import { Observable } from 'rxjs';

import { MessageStoreService } from '@services/message-store.service';

@Component({
	selector: 'cb-inbox',
	templateUrl: './inbox.component.html',
	styleUrls: ['./inbox.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InboxComponent {
	selectedMessageId$: Observable<string>;
	
	constructor(private messageStore: MessageStoreService) {
		this.selectedMessageId$ = this.messageStore.selectedMessageId$;
	}
}
