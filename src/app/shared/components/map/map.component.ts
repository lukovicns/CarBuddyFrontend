import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
	selector: 'cb-map',
	templateUrl: './map.component.html',
	styleUrls: ['./map.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MapComponent {
	@Input() origin: string | google.maps.Place;
	@Input() destination: string | google.maps.Place;
}
