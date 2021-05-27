import { Column } from '@models/column.type';
import { DropdownMenuItem } from '@models/dropdown-menu-item.type';

export const columns: Column[] = [
	{
		name: 'passengerName',
		label: 'Name',
	},
	{
		name: 'from',
		label: 'From',
	},
	{
		name: 'to',
		label: 'To',
	},
	{
		name: 'date',
		label: 'Date',
	},
	{
		name: 'time',
		label: 'Time',
	},
	{
		name: 'numberOfPassengers',
		label: 'Passengers',
	},
];

export const actions: DropdownMenuItem[] = [
	{
		key: 'accept',
		name: 'Accept',
		icon: 'check',
	},
	{
		key: 'decline',
		name: 'Decline',
		icon: 'clear',
		color: 'warn',
	},
];
