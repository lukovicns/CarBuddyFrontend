import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
	selector: 'cb-navigation-button-with-badge',
	templateUrl: './navigation-button-with-badge.component.html',
	styleUrls: ['./navigation-button-with-badge.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationButtonWithBadgeComponent {
	@Input() routes: string[];
	@Input() icon: string;
	@Input() tooltip: string;
	@Input() badgeCounter: number;
}
