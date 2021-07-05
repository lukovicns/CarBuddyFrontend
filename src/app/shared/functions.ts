export function toInstances<T, U>(type: new (data: U) => T, items: U[]): T[] {
	return items?.map((item: U) => new type(item));
}

export function findById<T extends number | string, U extends { id: T }>(items: U[], id: T): U {
	return items.find((item: U) => item.id === id)!;
}
