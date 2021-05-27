import { environment } from '@environment';
import { Pagination } from '@models/pagination.model';

const baseUrl = environment.baseUrl;
const apiUrl = environment.apiUrl;

export const chatHubUrl = `${baseUrl}/chat-hub`;
export const tripRequestHubUrl = `${baseUrl}/trip-request-hub`;

export const registerUrl = `${apiUrl}/auth/register`;
export const loginUrl = `${apiUrl}/auth/login`;
export const sendMessageUrl = `${apiUrl}/messages/send`;
export const tripsUrl = `${apiUrl}/trips`;
export const carsUrl = `${apiUrl}/cars`;
export const rateDriverUrl = `${apiUrl}/rating/rate`;
export const tripRequestsUrl = `${apiUrl}/trip-requests`;
export const sendTripRequestUrl = `${tripRequestsUrl}/send-request`;
export const acceptTripRequestUrl = `${tripRequestsUrl}/accept`;
export const declineTripRequestUrl = `${tripRequestsUrl}/decline`;

export const confirmEmailUrl = (userId: string, token: string) => `${apiUrl}/auth/confirm-email?userId=${userId}&token=${token}`;
export const tripUrl = (id: string) => `${tripsUrl}/${id}`;
export const searchTripsUrl = (pagination: Pagination) => `${apiUrl}/trips/search?${paginationQueryString(pagination.pageIndex, pagination.pageSize)}`;
export const tripsCreatedByMeUrl = (userId: string, pagination: Pagination) => `${apiUrl}/trips/${userId}/created-by-me?${paginationQueryString(pagination.pageIndex, pagination.pageSize)}`;
export const tripReservationsUrl = (userId: string, pagination: Pagination) => `${apiUrl}/trips/${userId}/reservations?${paginationQueryString(pagination.pageIndex, pagination.pageSize)}`;
export const tripsHistoryUrl = (userId: string, pagination: Pagination) => `${tripsUrl}/${userId}/history?${paginationQueryString(pagination.pageIndex, pagination.pageSize)}`;
export const tripRequestExistsUrl = (tripId: string, passengerId: string) => `${tripRequestsUrl}/exists?tripId=${tripId}&passengerId=${passengerId}`;
export const userCarUrl = (userId: string) => `${carsUrl}?userId=${userId}`;
export const conversationsUrl = (recipientId: string) => `${apiUrl}/conversations/${recipientId}?${paginationQueryString()}`;
export const conversationIdUrl = (firstParticipantId: string, secondParticipantId: string) => `${apiUrl}/conversations/conversation-id?firstParticipantId=${firstParticipantId}&secondParticipantId=${secondParticipantId}`;
export const conversationUrl = (conversationId: string) => `${apiUrl}/conversations/${conversationId}`;
export const markAsReadUrl = (conversationId: string) => `${apiUrl}/conversations/${conversationId}/mark-as-read`;
export const markAsUnreadUrl = (conversationId: string) => `${apiUrl}/conversations/${conversationId}/mark-as-unread`;
export const messagesUrl = (recipientId: string, conversationId: string, pageNumber = 1) => `${apiUrl}/messages/${recipientId}/conversation/${conversationId}?${paginationQueryString(pageNumber, 10)}`;
export const notificationsUrl = (userId: string) => `${apiUrl}/notifications/${userId}`;
export const tripRequestsCountUrl = (userId: string) => `${apiUrl}/notifications/trip-requests/${userId}`;
export const driverUrl = (driverId: string) => `${apiUrl}/drivers/${driverId}`;
export const canRateDriverUrl = (tripId: string, driverId: string, passengerId: string) => `${apiUrl}/rating/canRate?tripId=${tripId}&driverId=${driverId}&passengerId=${passengerId}`;

const paginationQueryString = (page = 1, size = 20) => `pageNumber=${page}&pageSize=${size}`;
