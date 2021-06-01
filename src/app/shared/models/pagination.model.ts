export class Pagination {
	pageIndex: number;
	pageSize: number;
	totalElements?: number;

	constructor(data: any) {
		this.pageIndex = (data.page || 1) - 1;
		this.pageSize = data.size || 2;

		if (data.totalElements) {
			this.totalElements = data.totalElements;
		}
	}
}
