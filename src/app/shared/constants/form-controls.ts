import { FormControl, Validators } from '@angular/forms';

import { constants } from '@constants/constants';

export const emailControl = new FormControl('', [
	Validators.required,
	Validators.pattern(constants.emailPattern),
]);

export const passwordControl = new FormControl('', [
	Validators.required,
	Validators.minLength(8),
	Validators.pattern(constants.passwordPattern),
]);
