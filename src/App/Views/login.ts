import { autoinject } from 'aurelia-framework';
import { APIService } from '../Services/APIService';
import { AuthenticatedRoutes } from '../Configs/routes';
import { Router } from 'aurelia-router';
import { Configuration } from '../Configs/configuration';

@autoinject
export class Login {
    constructor(
        private API: APIService,
        private authRoutes: AuthenticatedRoutes,
        private router: Router,
        private config: Configuration
    ) { }

    username: string = 'kursportal';
    password: string = 'Hallo1';

    authorize() {
        return this.API.login(this.username, this.password, this.config.landingRoute);
    }

    canActivate() {
        let isLoggedIn: boolean  = this.API.isTokenValid();
        let stayOnPage: boolean = true;

        this.config.isLoggedIn = isLoggedIn;
        isLoggedIn ? this.router.navigate(this.config.landingRoute) : stayOnPage;
    }
}
