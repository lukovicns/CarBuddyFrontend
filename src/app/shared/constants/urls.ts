import { environment } from '@environment';

const apiUrl = environment.apiUrl;

export const registerUrl = `${apiUrl}/auth/register`;
export const loginUrl = `${apiUrl}/auth/login`;
export const searchTripsUrl = (page: number, size: number) => `${apiUrl}/trips/search?page=${page}&size=${size}`;
export const tripUrl = (id: string) => `${apiUrl}/trips/${id}`;
