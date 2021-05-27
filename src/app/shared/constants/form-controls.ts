import { FormControl, ValidatorFn, Validators } from '@angular/forms';

import { constants } from '@constants/constants';

export const emailControl = (initialValue: string) => new FormControl(initialValue, [
	Validators.required,
	Validators.pattern(constants.emailPattern),
]);

export const passwordControl = (initialValue: string) => new FormControl(initialValue, [
	Validators.required,
	Validators.minLength(8),
	Validators.pattern(constants.passwordPattern),
]);

export const numberControl = (initialValue: number, min = 1, max = 8) => new FormControl(initialValue, [
	Validators.required,
	Validators.min(min),
	Validators.max(max),
]);

export function textControl(initialValue: string, minLength?: number, maxLength?: number) {
	const control = new FormControl(initialValue);
	control.setValidators(appendMinMaxValidators(minLength, maxLength));
	return control;
}

export function requiredTextControl(initialValue: string, minLength?: number, maxLength?: number) {
	const control = new FormControl(initialValue);
	control.setValidators([Validators.required, ...appendMinMaxValidators(minLength, maxLength)]);
	return control;
}

function appendMinMaxValidators(minLength?: number, maxLength?: number) {
	let validators: ValidatorFn[] = [];

	if (minLength) {
		validators = [...validators, Validators.minLength(minLength)];
	}

	if (maxLength) {
		validators = [...validators, Validators.maxLength(maxLength)];
	}

	return validators;
}
