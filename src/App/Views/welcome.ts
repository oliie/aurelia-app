import { autoinject } from 'aurelia-framework';
import { APIService } from '../Services/APIService';

@autoinject
export class Welcome {
    heading: string = 'Welcome to the Aurelia Navigation App!';
    firstName: string = 'John';
    user: string = 'oliverpraesto';
    lastName: string = 'Doe';
    previousValue: string = this.fullName;

    constructor(
        private api: APIService
    ) { }

    canActivate() {
        this.api.isTokenValid();
    }

    get fullName() {
        return `${this.firstName} ${this.lastName}`;
    }

    submit() {
        this.previousValue = this.fullName;
        alert(`Welcome, ${this.fullName}!`);
    }

    canDeactivate() {
        if (this.fullName !== this.previousValue) {
            return confirm('Are you sure you want to leave?');
        }
    }
}
