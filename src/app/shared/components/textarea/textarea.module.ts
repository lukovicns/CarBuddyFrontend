import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';

import { TextareaComponent } from '@components/textarea/textarea.component';

@NgModule({
	declarations: [
		TextareaComponent,
	],
	imports: [
		CommonModule,
		MatFormFieldModule,
		MatInputModule,
		ReactiveFormsModule,
	],
	exports: [
		TextareaComponent,
	],
})
export class TextareaModule { }
