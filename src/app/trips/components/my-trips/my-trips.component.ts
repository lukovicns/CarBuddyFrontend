import { ActivatedRoute, Router } from '@angular/router';
import { MatTabGroup } from '@angular/material/tabs';
import {
	Component,
	ChangeDetectionStrategy,
	ViewChild,
	OnInit,
} from '@angular/core';

import { constants, Constants } from '@constants/constants';
import { SelectedTab, tabs } from './tabs.type';

@Component({
	selector: 'cb-my-trips',
	templateUrl: './my-trips.component.html',
	styleUrls: ['./my-trips.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MyTripsComponent implements OnInit {
	@ViewChild('tabs', { static: true }) tabGroup: MatTabGroup;

	readonly constants: Constants = constants;

	constructor(
		private route: ActivatedRoute,
		private router: Router,
	) { }

	ngOnInit(): void {
		this.setTabIndex(this.route.snapshot.queryParamMap.get('tab'));
	}

	changeTab(index: number): void {
		this.router.navigate(['my-trips'], {
			queryParams: { tab: tabs.find((tab: SelectedTab) => tab.index === index)?.param || null },
		});
	}

	private setTabIndex(param: string | null): void {
		this.tabGroup.selectedIndex = tabs.find((tab: SelectedTab) => tab.param === param)?.index || 0;
	}
}
