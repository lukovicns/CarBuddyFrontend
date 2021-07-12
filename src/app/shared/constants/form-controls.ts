import { FormControl, Validators } from '@angular/forms';

import { constants } from '@constants/constants';

export const emailControl  = (initialValue: string) => new FormControl(initialValue, [
	Validators.required,
	Validators.pattern(constants.emailPattern),
]);

export const passwordControl = (initialValue: string) => new FormControl(initialValue, [
	Validators.required,
	Validators.minLength(8),
	Validators.pattern(constants.passwordPattern),
]);

export const numberControl = (initialValue: number, min?: number, max?: number) => new FormControl(initialValue, [
	Validators.required,
	Validators.min(min || 1),
	Validators.max(max || 8),
]);

export function requiredTextControl(initialValue: string, minLength?: number) {
	const control = new FormControl(initialValue);

	let validators = [Validators.required];

	if (minLength) {
		validators = [...validators, Validators.minLength(minLength)];
	}

	control.setValidators(validators);
	return control;
}
