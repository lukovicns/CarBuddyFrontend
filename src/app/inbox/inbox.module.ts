import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';

import { InboxComponent } from '@components/inbox/inbox.component';
import { ConversationComponent } from '@components/conversation/conversation.component';
import { ConversationsComponent } from '@components/conversations/conversations.component';
import { AvatarModule } from '@components/avatar/avatar.module';
import { LoaderModule } from '@components/loader/loader.module';
import { ProgressBarModule } from '@components/progress-bar/progress-bar.module';
import { TextareaModule } from '@components/textarea/textarea.module';
import { SubmitIconButtonModule } from '@components/submit-icon-button/submit-icon-button.module';
import { InboxRoutingModule } from '@modules/inbox-routing.module';
import { MessageComponent } from '@components/conversation/message/message.component';
import { SendMessageModule } from '@components/conversation/send-message/send-message.module';
import { ButtonLoaderModule } from '@components/button-loader/button-loader.module';
import { EmptyResultWithLinkModule } from '@components/empty-result-with-link/empty-result-with-link.module';
import { EmptyResultModule } from '@components/empty-result/empty-result.module';
import { TableWithActionsModule } from '@components/table-with-actions/table-with-actions.module';

@NgModule({
	declarations: [
		ConversationsComponent,
		InboxComponent,
		ConversationComponent,
		MessageComponent,
	],
	imports: [
		AvatarModule,
		ButtonLoaderModule,
		CommonModule,
		EmptyResultModule,
		EmptyResultWithLinkModule,
		InboxRoutingModule,
		LoaderModule,
		MatCardModule,
		ProgressBarModule,
		ReactiveFormsModule,
		SendMessageModule,
		SubmitIconButtonModule,
		TableWithActionsModule,
		TextareaModule,
	],
})
export class InboxModule { }
