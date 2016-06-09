import { autoinject } from 'aurelia-framework';
import { Validation } from 'aurelia-validation';

@autoinject
export class CustomForm {
    constructor(private validation: Validation) {
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

    validateForm(): void {
        // this.validation.on(this).validate()
        //     .then((x) => {
        //         console.log(x);
        //         alert(`Welcome, ${this.fullName}!`);
        //     });
        if (this.firstName.length !== 2) {
            console.log('Error:', 'First Name not equals to 2 chars');
        } else {
            alert(`Welcome, ${this.fullName}!`);
        }
    }
}
