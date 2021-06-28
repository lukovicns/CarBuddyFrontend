export function toInstances<T, U>(type: new (data: U) => T, items: U[]): T[] {
	return items?.map((item: U) => new type(item));
}
