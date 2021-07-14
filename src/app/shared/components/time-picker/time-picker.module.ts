import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { TimePickerComponent } from '@components/time-picker/time-picker.component';

@NgModule({
	declarations: [
		TimePickerComponent,
	],
	imports: [
		CommonModule,
		MatFormFieldModule,
		MatInputModule,
		ReactiveFormsModule,
	],
	exports: [
		TimePickerComponent,
	],
})
export class TimePickerModule { }
