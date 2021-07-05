import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InboxComponent } from '@components/inbox/inbox.component';
import { MessagePreviewComponent } from '@components/message-preview/message-preview.component';
import { ConversationsComponent } from '@components/conversations/conversations.component';
import { CardModule } from '@components/card/card.module';
import { LoaderModule } from '@components/loader/loader.module';
import { SelectionTableModule } from '@components/selection-table/selection-table.module';
import { ProgressBarModule } from '@components/progress-bar/progress-bar.module';
import { InboxRoutingModule } from '@modules/inbox-routing.module';

@NgModule({
	declarations: [
		ConversationsComponent,
		InboxComponent,
		MessagePreviewComponent,
	],
	imports: [
		CardModule,
		CommonModule,
		InboxRoutingModule,
		LoaderModule,
		ProgressBarModule,
		SelectionTableModule,
	],
})
export class InboxModule { }
