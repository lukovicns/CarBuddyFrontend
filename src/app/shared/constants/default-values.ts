import * as moment from 'moment';

export const minimumPrice = 1;
export const maximumPrice = 10000;
export const defaultPrice = 500;

export const today = moment();
export const tomorrow = moment().add(1, 'd');
export const twoWeeks = moment().add(2, 'w');

export const avatarUrl = '/assets/images/avatar.png';
