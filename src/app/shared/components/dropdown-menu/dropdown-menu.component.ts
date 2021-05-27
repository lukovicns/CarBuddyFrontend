import {
	ChangeDetectionStrategy,
	Component,
	EventEmitter,
	Input,
	Output,
} from '@angular/core';

import { DropdownMenuItem } from '@models/dropdown-menu-item.type';

@Component({
	selector: 'cb-dropdown-menu',
	templateUrl: './dropdown-menu.component.html',
	styleUrls: ['./dropdown-menu.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DropdownMenuComponent {
	@Input() items: DropdownMenuItem[];

	@Output() onHandleAction = new EventEmitter<string>();
}
