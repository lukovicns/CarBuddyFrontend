import * as moment from 'moment';

export class DateTimeParser {
	dateTime: moment.Moment;

	constructor(date: string, time?: string) {
		this.dateTime = time?.trim()
			? this.createDateTime(date, time)
			: this.createDate(date);
	}

	format(format: string): string {
		return this.dateTime.format(format);
	}

	private createDateTime(date: string, time: string): moment.Moment {
		const newDate = this.createDate(date);
		const [hours, minutes] = time.split(':');
		newDate.add(+hours, 'hours');
		newDate.add(+minutes, 'minutes');
		return newDate;
	}

	private createDate(date: string): moment.Moment {
		const [day, month, year] = date.split('-');
		return moment(`${day}/${month}/${year}`, 'DD/MM/YYYY');
	}
}
