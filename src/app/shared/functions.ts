import { AbstractControl, FormGroup } from '@angular/forms';

export function getFormControlName(form: FormGroup, formControl: AbstractControl): string {
	return Object.keys(form.controls)
		.find((name: string) => form.controls[name] == formControl)!;
}
