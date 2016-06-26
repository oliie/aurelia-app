import { autoinject } from 'aurelia-framework';
import { Router } from 'aurelia-router';

@autoinject
export class AuthenticatedRoutes {
    constructor(
        private router: Router
    ) { }
}