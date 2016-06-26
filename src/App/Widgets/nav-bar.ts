import { autoinject, bindable } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Configuration } from '../Configs/configuration';
import { APIService } from '../Services/APIService';

@autoinject
export class NavBar {
    @bindable router: Router = null;

    constructor(
        private API: APIService,
        private config: Configuration
    ) { }

    get isLoggedIn(): boolean {
        return this.config.isLoggedIn;
    }

    logOut() {
        sessionStorage.clear();
        this.config.isLoggedIn = false;
        this.router.navigate(this.config.notAuthorizedRoute);
    }
}