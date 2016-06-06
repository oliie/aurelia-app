export class Validation {
    firstName: string = 'Iron';
    lastName: string = 'Man';

    get fullName(): string {
        return `${this.firstName} ${this.lastName}`;
    }

    validateForm(): void {
        console.log(`Welcome, ${this.fullName}!`);
    }
}
