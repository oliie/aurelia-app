import { autoinject } from 'aurelia-framework';
import { Validation } from 'aurelia-validation';
import { Configuration } from '../Configs/configuration';
import { APIService } from '../Services/APIService';

@autoinject
export class CustomForm {
    constructor(
        private config: Configuration,
        private validation: Validation,
        private API: APIService
    ) {
        this.validation.on(this.validateForm)
            .ensure('firstName')
            .hasMinLength(3)
            .isNotEmpty();
    }

    firstName:  string = 'Oliver';
    lastName:   string = 'Praesto';

    get fullName(): string {
        return `${this.firstName} ${this.lastName}`;
    }

    canActivate() {
        return this.API.isTokenValid();
    }

    validateForm(): void {
        if (this.firstName.length !== 2) {
            console.log('Error:', 'First Name not equals to 2 chars');
        } else {
            alert(`Welcome, ${this.fullName}!`);
        }
    }
}
