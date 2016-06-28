import { autoinject } from 'aurelia-framework';
import { Configuration } from './App/Configs/configuration';
import { Router, RouterConfiguration } from 'aurelia-router';

@autoinject
export class App {
    constructor(
        private router: Router,
        private config: Configuration
    ) { }

    configureRouter(routerConfig: RouterConfiguration, router: Router) {
        routerConfig.title = this.config.projectTitle;

        routerConfig.map([
            {
                route: ['', 'login'],
                name: 'login',
                moduleId: 'App/Views/login',
                nav: false,
                title: 'Login'
            }, {
                route: 'welcome',
                name: 'welcome',
                moduleId: 'App/Views/welcome',
                nav: true,
                title: 'Welcome'
            }, {
                route: 'users',
                name: 'users',
                moduleId: 'App/Views/users',
                nav: false,
                title: 'Github Users'
            }, {
                route: 'child-router',
                name: 'child-router',
                moduleId: 'App/Views/child-router',
                nav: true,
                title: 'Child Router'
            }, {
                route: 'custom-form',
                name: 'custom-form',
                moduleId: 'App/Views/custom-form',
                nav: true,
                title: 'Custom Form'
            }
        ]);

        this.router = router;
    }
}
