import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
	selector: 'cb-navigation-button',
	templateUrl: './navigation-button.component.html',
	styleUrls: ['./navigation-button.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationButtonComponent {
	@Input() routes: string[];
	@Input() icon: string;
	@Input() tooltip: string;
}
