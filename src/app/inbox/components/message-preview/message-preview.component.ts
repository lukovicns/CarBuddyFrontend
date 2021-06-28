import {
	Component,
	ChangeDetectionStrategy,
	Input,
	SimpleChanges,
	OnChanges, 
} from '@angular/core';

import { Message } from '@models/message.type';
import { MessageService } from '@services/message.service';
import { Observable } from 'rxjs';

@Component({
	selector: 'cb-message-preview',
	templateUrl: './message-preview.component.html',
	styleUrls: ['./message-preview.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessagePreviewComponent implements OnChanges {
	@Input() messageId: string;

	message$: Observable<Message>;

	constructor(private messageService: MessageService) { }

	ngOnChanges(changes: SimpleChanges): void {
		if (changes.messageId.currentValue) {
			this.message$ = this.messageService.getMessage(this.messageId);
		}
	}
}
