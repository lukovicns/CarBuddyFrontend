import { environment } from '@environment';

const baseUrl = environment.baseUrl;
const apiUrl = environment.apiUrl;

export const registerUrl = `${apiUrl}/auth/register`;
export const loginUrl = `${apiUrl}/auth/login`;
export const sendMessageUrl = `${apiUrl}/messages/send`;
export const chatUrl = `${baseUrl}/chat`;

export const searchTripsUrl = (page: number, size: number) => `${apiUrl}/trips/search?page=${page}&size=${size}`;
export const tripUrl = (id: string) => `${apiUrl}/trips/${id}`;
export const makeReservationUrl = (id: string) => `${tripUrl(id)}/make-reservation`;
export const conversationsUrl = (recipientId: string) => `${apiUrl}/conversations/${recipientId}?pageNumber=1&pageSize=20`;
export const markAsReadUrl = (conversationId: string) => `${apiUrl}/conversations/${conversationId}/mark-as-read`;
export const messagesUrl = (recipientId: string, conversationId: string) => `${apiUrl}/messages/${recipientId}/conversation/${conversationId}?pageNumber=1&pageSize=20`;
