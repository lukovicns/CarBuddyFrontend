import * as moment from 'moment';

import { Conversation } from '@models/conversation.model';
import { ConversationStatus } from './conversation-status.enum';

export class ConversationData {
	id: string;
	contact: string;
	message: string;
	dateTime: string;
	style: 'bold' | null;

	constructor(userId: string, data: Conversation) {
		this.id = data.id;
		this.contact = this.getContact(userId, data);
		this.message = data.message;
		this.dateTime = this.formatDateTime(data.date);

		if (data.status === ConversationStatus.Unread) {
			this.style = 'bold';
		}
	}

	private getContact(userId: string, data: Conversation): string {
		return userId === data.user.id
			? data.participant.fullName
			: data.user.fullName;
	}

	private formatDateTime(date: moment.Moment): string {
		if (this.isAfterOneYear(date)) {
			return date.format('MMM D, yyyy');
		}

		if (this.isAfterOneWeek(date)) {
			return date.format('MMM D');
		}

		if (this.isToday(date)) {
			return date.format('HH:mm');
		}

		return date.format('dddd');
	}

	private isAfterOneYear(date: moment.Moment): boolean {
		return moment(date).startOf('day').isBefore(moment().subtract(1, 'year'));
	}

	private isAfterOneWeek(date: moment.Moment): boolean {
		return moment(date).isBefore(moment().subtract(7, 'days'));
	}

	private isToday(date: moment.Moment): boolean {
		return moment(date).isSame(moment(), 'day');
	}
}
