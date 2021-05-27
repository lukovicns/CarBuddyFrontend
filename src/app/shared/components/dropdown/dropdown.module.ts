import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { DropdownComponent } from '@components/dropdown/dropdown.component';

@NgModule({
	declarations: [
		DropdownComponent,
	],
	imports: [
		CommonModule,
		MatFormFieldModule,
		MatInputModule,
		MatSelectModule,
		ReactiveFormsModule,
	],
	exports: [
		DropdownComponent,
	],
})
export class DropdownModule { }
