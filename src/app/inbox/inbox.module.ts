import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';

import { InboxComponent } from '@components/inbox/inbox.component';
import { ConversationComponent } from '@components/conversation/conversation.component';
import { ConversationsComponent } from '@components/conversations/conversations.component';
import { AvatarModule } from '@components/avatar/avatar.module';
import { LoaderModule } from '@components/loader/loader.module';
import { SelectionTableModule } from '@components/selection-table/selection-table.module';
import { ProgressBarModule } from '@components/progress-bar/progress-bar.module';
import { TextareaModule } from '@components/textarea/textarea.module';
import { SubmitIconButtonModule } from '@components/submit-icon-button/submit-icon-button.module';
import { InboxRoutingModule } from '@modules/inbox-routing.module';
import { MessageComponent } from '@components/conversation/message/message.component';
import { SendMessageComponent } from '@components/conversation/send-message/send-message.component';
import { ButtonLoaderModule } from '@components/button-loader/button-loader.module';

@NgModule({
	declarations: [
		ConversationsComponent,
		InboxComponent,
		ConversationComponent,
		MessageComponent,
		SendMessageComponent,
	],
	imports: [
		AvatarModule,
		ButtonLoaderModule,
		CommonModule,
		InboxRoutingModule,
		LoaderModule,
		MatCardModule,
		ProgressBarModule,
		ReactiveFormsModule,
		SelectionTableModule,
		SubmitIconButtonModule,
		TextareaModule,
	],
})
export class InboxModule { }
