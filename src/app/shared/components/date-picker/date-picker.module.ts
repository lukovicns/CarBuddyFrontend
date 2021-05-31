import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { DatePickerComponent } from '@components/date-picker/date-picker.component';

@NgModule({
	declarations: [
		DatePickerComponent,
	],
	imports: [
		CommonModule,
		MatDatepickerModule,
		MatFormFieldModule,
		MatInputModule,
		MatMomentDateModule,
		ReactiveFormsModule,
	],
	exports: [
		DatePickerComponent,
	],
})
export class DatePickerModule { }
