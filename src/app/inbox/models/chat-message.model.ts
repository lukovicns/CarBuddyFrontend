import * as moment from 'moment';

export class ChatMessage {
	conversationId: string;
	userId: string;
	userFirstName: string;
	userLastName: string;
	participantId: string;
	participantFirstName: string;
	participantLastName: string;
	message: string;
	date: moment.Moment;

	constructor(data: any) {
		this.conversationId = data.conversationId;
		this.userId = data.userId;
		this.userFirstName = data.userFirstName;
		this.userLastName = data.userLastName;
		this.participantId = data.participantId;
		this.participantFirstName = data.participantFirstName;
		this.participantLastName = data.participantLastName;
		this.message = data.message;
		this.date = moment(data.date);
	}

	get recipientFullName(): string {
		return `${this.participantFirstName} ${this.participantLastName}`;
	}

	isRecipient(id: string): boolean {
		return this.participantId === id;
	}

	showDate(previousMessage: ChatMessage | null): boolean {
		if (!previousMessage) {
			return false;
		}

		return !this.isRecipientFor(previousMessage)
			&& this.isMoreThanOneHour(previousMessage.date);
	}

	get dateTime(): string {
		if (this.isToday) {
			return this.date.format('HH:mm');
		}

		if (this.isCurrentWeek) {
			return this.date.format('dddd at HH:mm');
		}

		if (!this.isCurrentMonthAndYear) {
			return this.date.fromNow();
		}

		return this.date.format('dddd');
	}

	private isCurrentMonthAndYear(): boolean {
		return this.date.month === moment().month
			&& this.date.month === moment().year;
	}

	private get isToday(): boolean {
		return this.date.isSame(new Date(), 'day');
	}

	private get isCurrentWeek(): boolean {
		return this.date.week === moment().week;
	}

	private isRecipientFor(message: ChatMessage): boolean {
		return message.userId === this.userId;
	}

	private isMoreThanOneHour(date: moment.Moment): boolean {
		return date.diff(this.date, 'hours') > 1;
	}
}
