export type SelectedTab = {
	index: number;
	param: string;
}

export const tabs: SelectedTab[] = [
	{
		index: 0,
		param: 'created-by-me',
	},
	{
		index: 1,
		param: 'reservations',
	},
	{
		index: 2,
		param: 'history',
	},
];
