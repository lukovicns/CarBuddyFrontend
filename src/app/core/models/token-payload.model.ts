import * as moment from 'moment';

export class TokenPayload {
	id: string;
	expiresAt: moment.Moment;

	constructor(data: any) {
		this.id = data.sub || '';
		this.expiresAt = moment.unix(data.exp);
	}

	get isValid(): boolean {
		return !!this.expiresAt?.isAfter(moment())
			&& !!this.id;
	}

	static get empty(): TokenPayload {
		return new TokenPayload({});
	}
}
