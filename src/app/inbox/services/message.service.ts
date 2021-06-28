import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { Message } from '@models/message.type';

const messages: Message[] = [
	{
		id: '1',
		from: 'm@m.com',
		title: 'Hello world',
		content: 'Hello and welcome!',
		date: '2021-06-28',
	},
	{
		id: '2',
		from: 'm@m1.com',
		title: 'Hello world111',
		content: 'Hello and welcome11111 Hello and welcome11111Hello and welcome11111Hello and welcome11111Hello and welcome11111Hello and welcome11111Hello and welcome11111Hello and welcome11111!',
		date: '2021-06-20',
	},
];

@Injectable({
	providedIn: 'root',
})
export class MessageService {
	getMessages(): Observable<Message[]> {
		return of(messages);
	}

	getMessage(messageId: string): Observable<Message> {
		return of(messages.find((message: Message) => message.id === messageId)!);
	}
}
