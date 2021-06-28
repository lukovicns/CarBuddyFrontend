import { environment } from '@environment';

const apiUrl = environment.apiUrl;

export const registerUrl = `${apiUrl}/auth/register`;
export const loginUrl = `${apiUrl}/auth/login`;

export const searchTripsUrl = (page: number, size: number) => `${apiUrl}/trips/search?page=${page}&size=${size}`;
export const tripUrl = (id: string) => `${apiUrl}/trips/${id}`;
export const makeReservationUrl = (id: string) => `${tripUrl(id)}/make-reservation`;
export const inboxMessagesUrl = (userId: string) => `${apiUrl}/inbox/${userId}?page=1&size=20`;
export const chatMessagesUrl = (recipientId: string, senderId: string) => `${apiUrl}/inbox/messages?recipientId=${recipientId}&senderId=${senderId}?page=1&size=20`;
