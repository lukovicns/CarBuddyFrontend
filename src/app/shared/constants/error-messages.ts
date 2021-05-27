export interface ErrorMessages {
	invalidDate: string;
	minDate: (formControlName: string, minDate: string) => string;
	maxDate: (formControlName: string, minDate: string) => string;
	required: (formControlName: string) => string;
	minLength: (formControlName: string, length: number) => string;
	pattern: (formControlName: string) => string;
	min: (formControlName: string, min: number) => string;
	max: (formControlName: string, max: number) => string;
}

export const errorMessages: ErrorMessages = {
	invalidDate: 'Invalid date provided.',
	minDate: (formControlName: string, minDate: string) => `${formControlName} must be at least ${minDate}`,
	maxDate: (formControlName: string, maxDate: string) => `${formControlName} cannot be more than ${maxDate}`,
	required: (formControlName: string) => `${formControlName} is required.`,
	minLength: (formControlName: string, length: number) => `${formControlName} is must contain at least ${length} characters.`,
	min: (formControlName: string, min: number) => `${formControlName} must be at least ${min}.`,
	max: (formControlName: string, max: number) => `${formControlName} cannot be more than ${max}.`,
	pattern: (formControlName: string) => `${formControlName} is invalid.`,
};
