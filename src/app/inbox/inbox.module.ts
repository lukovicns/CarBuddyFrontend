import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { InboxComponent } from '@components/inbox/inbox.component';
import { MessagePreviewComponent } from '@components/message-preview/message-preview.component';
import { ConversationsComponent } from '@components/conversations/conversations.component';
import { CardModule } from '@components/card/card.module';
import { LoaderModule } from '@components/loader/loader.module';
import { SelectionTableModule } from '@components/selection-table/selection-table.module';
import { ProgressBarModule } from '@components/progress-bar/progress-bar.module';
import { TextareaModule } from '@components/textarea/textarea.module';
import { SubmitIconButtonModule } from '@components/submit-icon-button/submit-icon-button.module';
import { InboxRoutingModule } from '@modules/inbox-routing.module';
import { MessageComponent } from '@components/message-preview/message/message.component';

@NgModule({
	declarations: [
		ConversationsComponent,
		InboxComponent,
		MessagePreviewComponent,
  MessageComponent,
	],
	imports: [
		CardModule,
		CommonModule,
		InboxRoutingModule,
		LoaderModule,
		ProgressBarModule,
		ReactiveFormsModule,
		SelectionTableModule,
		SubmitIconButtonModule,
		TextareaModule,
	],
})
export class InboxModule { }
