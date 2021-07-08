import * as moment from 'moment';

export class ChatMessage {
	conversationId: string;
	authorId: string;
	authorFirstName: string;
	authorLastName: string;
	recipientId: string;
	recipientFirstName: string;
	recipientLastName: string;
	message: string;
	date: moment.Moment;

	constructor(data: any) {
		this.conversationId = data.conversationId;
		this.authorId = data.authorId;
		this.authorFirstName = data.authorFirstName;
		this.authorLastName = data.authorLastName;
		this.recipientId = data.recipientId;
		this.recipientFirstName = data.recipientFirstName;
		this.recipientLastName = data.recipientLastName;
		this.message = data.message;
		this.date = moment(data.date);
	}

	get recipientFullName(): string {
		return `${this.recipientFirstName} ${this.recipientLastName}`;
	}

	isRecipient(participantId: string): boolean {
		return this.recipientId === participantId;
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
		return message.authorId === this.authorId;
	}

	private isMoreThanOneHour(date: moment.Moment): boolean {
		return date.diff(this.date, 'hours') > 1;
	}
}
