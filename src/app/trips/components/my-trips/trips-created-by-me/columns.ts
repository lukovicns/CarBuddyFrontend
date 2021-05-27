import { Column } from '@models/column.type';
import { DropdownMenuItem } from '@models/dropdown-menu-item.type';

export const columns: Column[] = [
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
		name: 'timeRange',
		label: 'Time',
	},
];

export const actions: DropdownMenuItem[] = [
	{
		key: 'edit',
		name: 'Edit',
		icon: 'edit',
	},
	{
		key: 'remove',
		name: 'Remove',
		icon: 'delete',
		color: 'warn',
	},
];
