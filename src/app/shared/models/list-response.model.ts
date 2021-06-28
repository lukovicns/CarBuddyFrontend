import { Pagination } from '@models/pagination.model';

export class ListResponse<T> {
	content: T[];
	pagination: Pagination;
}
