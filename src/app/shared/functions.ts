export function toInstances<T, U>(type: new (data: U) => T, items: U[]): T[] {
	return items?.map((item: U) => new type(item));
}

export function findById<T extends number | string, U extends { id: T }>(items: U[], id: T): U {
	return items.find((item: U) => item.id === id)!;
}

export function getFormControlName(control: any): string {
	const formGroup = control.parent!.controls;
	return Object.keys(formGroup).find((name: string) => control === formGroup[name])!;
}

export function updateAtIndex<T extends { id: string }>(items: T[], item: T): T[] {
	const index = items.map((item: T) => item.id)
		.findIndex((id: string) => item.id === id);

	return [
		...items.slice(0, index),
		item,
		...items.slice(index + 1),
	];
}

export function truncate(source: string, length = 15): string {
	return source.length > length
		? `${source.slice(0, length - 1)}...`
		: source;
}
