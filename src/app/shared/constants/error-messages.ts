export interface ErrorMessages {
	required: (formControlName: string) => string;
	minLength: (formControlName: string, length: number) => string;
	pattern: (formControlName: string) => string;
	min: (formControlName: string) => string;
	max: (formControlName: string) => string;
}

export const errorMessages: ErrorMessages = {
	required: (formControlName: string) => `${formControlName} is required.`,
	minLength: (formControlName: string, length: number) => `${formControlName} is must contain at least ${length} characters.`,
	min: (formControlName: string) => `${formControlName} has min error.`,
	max: (formControlName: string) => `${formControlName} has max error.`,
	pattern: (formControlName: string) => `${formControlName} is invalid.`,
};
