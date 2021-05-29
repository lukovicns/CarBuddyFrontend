import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { UploadFormFieldComponent } from '@form-field/upload-form-field/upload-form-field.component';

@NgModule({
	declarations: [
		UploadFormFieldComponent,
	],
	imports: [
		CommonModule,
		MatButtonModule,
		MatIconModule,
	],
	exports: [
		UploadFormFieldComponent,
	],
})
export class UploadFormFieldModule { }
