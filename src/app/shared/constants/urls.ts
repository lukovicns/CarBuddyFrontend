import { environment } from '@environment';

const apiUrl = environment.apiUrl;

export const registerUrl = `${apiUrl}/auth/register`;
export const loginUrl = `${apiUrl}/auth/login`;
