import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';

import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Constants, constants } from '@constants/constants';
import { AuthService } from '@services/auth.service';
import { AuthStoreService } from '@services/auth-store.service';
import { ConversationStoreService } from '@services/conversation-store.service';

@Component({
	selector: 'cb-navigation',
	templateUrl: './navigation.component.html',
	styleUrls: ['./navigation.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationComponent {
	isUserLoggedIn$: Observable<boolean>;
	unreadConversationsCount: number | null;

	readonly constants: Constants = constants;

	private destroy$ = new Subject<void>();

	constructor(
		private cdRef: ChangeDetectorRef,
		private authService: AuthService,
		private authStore: AuthStoreService,
		public conversationStore: ConversationStoreService,
	) {
		this.isUserLoggedIn$ = this.authStore.isUserLoggedIn$;
		this.conversationStore.unreadConversationsCount$
			.pipe(takeUntil(this.destroy$))
			.subscribe((unreadConversationsCount: number | null) => {
				this.unreadConversationsCount = unreadConversationsCount;
				this.cdRef.markForCheck();
			});
	}

	logout(): void {
		this.conversationStore.clearUnreadConversationsCount();
		this.authService.logout();
	}
}
