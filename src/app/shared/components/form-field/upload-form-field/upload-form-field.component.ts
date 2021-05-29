import { Component } from '@angular/core';

@Component({
	selector: 'cb-upload-form-field',
	templateUrl: './upload-form-field.component.html',
	styleUrls: ['./upload-form-field.component.scss'],
})
export class UploadFormFieldComponent {
	fileName: string;

	onFileSelected(event: any) {
		const file: File = event.target.files[0];

		if (file) {
			this.fileName = file.name;
			// const formData = new FormData();
			// formData.append('thumbnail', file);
			// const upload$ = this.http.post('/api/thumbnail-upload', formData);
			// upload$.subscribe();
		}
	}
}
