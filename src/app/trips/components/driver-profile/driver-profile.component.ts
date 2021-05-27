import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { Driver } from '@models/driver.model';
import { DriverService } from '@services/driver.service';

@Component({
	selector: 'cb-driver-profile',
	templateUrl: './driver-profile.component.html',
	styleUrls: ['./driver-profile.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DriverProfileComponent implements OnInit {
	driver$: Observable<Driver>;

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private driverService: DriverService,
	) { }

	ngOnInit(): void {
		this.driver$ = this.driverService.getDriver(this.route.snapshot.paramMap.get('id')!)
			.pipe(
				tap({
					error: () => this.router.navigate(['/']),
				}),
			);
	}
}
