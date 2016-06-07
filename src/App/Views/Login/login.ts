import { autoinject } from 'aurelia-framework';
import { APIService } from '../../Services/APIService';
import { Router } from 'aurelia-router';

@autoinject
export class Login {
    constructor(
        private API: APIService,
        private router: Router
    ) { }

    username: string;
    password: string;
    successRoute: string = 'welcome'

    checkAuthorization(): void {
        let hasToken = !!sessionStorage.getItem('token');
        hasToken && this.router.navigate(this.successRoute);
    }

    authorize() {
        return this.API.login(this.username, this.password)
            .then(token => {
                sessionStorage.setItem('token', token.access_token);
                this.checkAuthorization();
            });
    }
}