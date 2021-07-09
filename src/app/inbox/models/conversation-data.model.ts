import * as moment from 'moment';

import { Conversation } from '@models/conversation.model';

export class ConversationData {
	id: string;
	contact: string;
	message: string;
	dateTime: string;
	
	constructor(data: Conversation) {
		this.id = data.id;
		this.contact = data.recipient.fullName;
		this.message = data.message;
		this.dateTime = this.formatDateTime(data.date);
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
