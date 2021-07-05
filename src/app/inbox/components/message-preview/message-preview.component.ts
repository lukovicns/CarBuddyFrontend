import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

import { Message } from '@models/message.model';

@Component({
	selector: 'cb-message-preview',
	templateUrl: './message-preview.component.html',
	styleUrls: ['./message-preview.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessagePreviewComponent {
	@Input() messages: Message[];
}
