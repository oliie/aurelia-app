import { autoinject } from 'aurelia-framework';
import { Router } from 'aurelia-router';

@autoinject
export class Welcome {
    constructor( private router: Router ) { }

    heading: string = 'Welcome to Aurelia!';
    firstName: string = 'Oliver';
    lastName: string = 'Praesto';

    get fullName() : string {
        return `${this.firstName} ${this.lastName}`;
    }

    navigateToUsers() : void {
        this.router.navigateToRoute('users');
    }

    submit() : void {
        alert(`Welcome, ${this.fullName}!`);
    }
}