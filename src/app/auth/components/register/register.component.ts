import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
	AbstractControl,
	FormControl,
	FormGroup,
	Validators, 
} from '@angular/forms';

import { constants, Constants } from '@constants/constants';

@Component({
	selector: 'cb-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent implements OnInit {
	form: FormGroup;
	
	readonly constants: Constants = constants;

	ngOnInit(): void {
		this.form = new FormGroup({
			firstName: new FormControl('', [
				Validators.required,
				Validators.minLength(3),
			]),
			lastName: new FormControl('', [
				Validators.required,
				Validators.minLength(3),
			]),
			email: new FormControl('', [
				Validators.required,
				Validators.pattern(constants.emailPattern),
			]),
			password: new FormControl('', [
				Validators.required,
				Validators.minLength(8),
				Validators.pattern(constants.passwordPattern),
			]),
			age: new FormControl(10, [
				Validators.required,
				Validators.min(10),
				Validators.max(150),
			]),
		});
	}

	register(): void {
		console.log(this.form.value);
	}

	control(name: string): AbstractControl {
		return this.form.get(name)!;
	}
}
