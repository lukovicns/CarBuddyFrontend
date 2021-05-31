export interface ErrorMessages {
	invalidDate: string;

	required: (formControlName: string) => string;
	minLength: (formControlName: string, length: number) => string;
	pattern: (formControlName: string) => string;
	min: (formControlName: string, min: number) => string;
	max: (formControlName: string, max: number) => string;
}

export const errorMessages: ErrorMessages = {
	invalidDate: 'Invalid date provided.',

	required: (formControlName: string) => `${formControlName} is required.`,
	minLength: (formControlName: string, length: number) => `${formControlName} is must contain at least ${length} characters.`,
	min: (formControlName: string, min: number) => `${formControlName} must be at least ${min}.`,
	max: (formControlName: string, max: number) => `${formControlName} cannot be more than ${max}.`,
	pattern: (formControlName: string) => `${formControlName} is invalid.`,
};
