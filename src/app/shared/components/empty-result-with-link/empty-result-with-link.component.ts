import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

import { MessageWithLink } from '@models/message-with-link.type';

@Component({
	selector: 'cb-empty-result-with-link',
	templateUrl: './empty-result-with-link.component.html',
	styleUrls: ['./empty-result-with-link.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmptyResultWithLinkComponent {
	@Input() message: MessageWithLink;
}
