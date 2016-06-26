import { autoinject } from 'aurelia-framework';
import { APIService } from '../Services/APIService';
import { Configuration } from '../Configs/configuration';
import { Router } from 'aurelia-router';

@autoinject
export class Welcome {

    constructor(
        private API: APIService,
        private config: Configuration,
        private router: Router
    ) { }

    heading: string = 'Welcome to the Aurelia Navigation App!';
    firstName: string = 'John';
    user: string = 'oliverpraesto';
    lastName: string = 'Doe';
    previousValue: string = this.fullName;
    alreadyLoggedInRoute: string = this.config.landingRoute;

    canActivate() {
        return this.API.isTokenValid();
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
