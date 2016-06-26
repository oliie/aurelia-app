import { autoinject } from 'aurelia-framework';
import { APIService } from '../Services/APIService';
import { Router } from 'aurelia-router';
import { Configuration } from '../Configs/configuration';

@autoinject
export class Login {
    constructor(
        private API: APIService,
        private router: Router,
        private config: Configuration
    ) { }

    username: string = 'kursportal';
    password: string = 'Hallo1';

    authorize() {
        return this.API.login(this.username, this.password);
    }

    canActivate() {
        let isLoggedIn: boolean  = this.API.isTokenValid();
        let stayOnPage: boolean = true;

        this.config.isLoggedIn = isLoggedIn;
        isLoggedIn ? this.router.navigate(this.config.landingRoute) : stayOnPage;
    }
}
