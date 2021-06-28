import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SelectionTableModule } from '@components/selection-table/selection-table.module';
import { InboxComponent } from '@components/inbox/inbox.component';
import { MessagePreviewComponent } from '@components/message-preview/message-preview.component';
import { MessagesComponent } from '@components/messages/messages.component';
import { CardModule } from '@components/card/card.module';
import { InboxRoutingModule } from '@modules/inbox-routing.module';

@NgModule({
	declarations: [
		InboxComponent,
		MessagePreviewComponent,
		MessagesComponent,
	],
	imports: [
		CardModule,
		CommonModule,
		InboxRoutingModule,
		SelectionTableModule,
	],
})
export class InboxModule { }
