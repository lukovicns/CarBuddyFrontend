import { Component, EventEmitter, Output } from '@angular/core';

import { constants, Constants } from '@constants/constants';

@Component({
	selector: 'cb-upload-form-field',
	templateUrl: './upload-form-field.component.html',
	styleUrls: ['./upload-form-field.component.scss'],
})
export class UploadFormFieldComponent {
	@Output() onFileSelected = new EventEmitter<File>();

	fileName: string;

	readonly constants: Constants = constants;

	selectFile(event: any) {
		const file: File = event.target.files[0];

		if (file) {
			this.fileName = file.name;
			this.onFileSelected.emit(file);
		}
	}
}
