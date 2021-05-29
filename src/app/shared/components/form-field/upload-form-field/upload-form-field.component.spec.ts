import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadFormFieldComponent } from './upload-form-field.component';

describe('UploadFormFieldComponent', () => {
	let component: UploadFormFieldComponent;
	let fixture: ComponentFixture<UploadFormFieldComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [UploadFormFieldComponent],
		})
			.compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(UploadFormFieldComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
