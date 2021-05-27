import { Column } from '@models/column.type';
import { DropdownMenuItem } from '@models/dropdown-menu-item.type';

export const columns: Column[] = [
	{
		name: 'contact',
		label: 'Contact',
	},
	{
		name: 'message',
		label: 'Message',
	},
	{
		name: 'dateTime',
		label: 'Date/Time',
	},
];

export const actions: DropdownMenuItem[] = [
	{
		key: 'delete',
		name: 'Delete',
		icon: 'delete',
		color: 'warn',
	},
];
