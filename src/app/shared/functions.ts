import { AbstractControl, FormGroup } from '@angular/forms';

export function getFormControlName(form: FormGroup, formControl: AbstractControl): string {
	const formControlName = Object.keys(form.controls)
		.find((name: string) => form.controls[name] == formControl)!;

	console.log(formControlName);
	return formControlName;
}
