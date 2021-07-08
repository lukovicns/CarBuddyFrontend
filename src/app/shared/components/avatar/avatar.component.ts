import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
	selector: 'cb-avatar',
	templateUrl: './avatar.component.html',
	styleUrls: ['./avatar.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AvatarComponent { }
