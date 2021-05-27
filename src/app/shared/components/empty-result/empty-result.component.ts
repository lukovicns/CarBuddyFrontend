import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
	selector: 'cb-empty-result',
	templateUrl: './empty-result.component.html',
	styleUrls: ['./empty-result.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmptyResultComponent {
	@Input() message: string;
}
