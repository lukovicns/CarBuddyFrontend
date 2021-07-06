import { environment } from '@environment';

const apiUrl = environment.apiUrl;

export const registerUrl = `${apiUrl}/auth/register`;
export const loginUrl = `${apiUrl}/auth/login`;
export const sendMessageUrl = `${apiUrl}/messages/send`;
export const socketUrl = `${apiUrl}/chatsocket`;

export const searchTripsUrl = (page: number, size: number) => `${apiUrl}/trips/search?page=${page}&size=${size}`;
export const tripUrl = (id: string) => `${apiUrl}/trips/${id}`;
export const makeReservationUrl = (id: string) => `${tripUrl(id)}/make-reservation`;
export const conversationsUrl = (recipientId: string) => `${apiUrl}/messages/${recipientId}?pageNumber=1&pageSize=20`;
export const messagesUrl = (recipientId: string, senderId: string) => `${apiUrl}/messages/${recipientId}/${senderId}?pageNumber=1&pageSize=20`;
