import { Router, RouterConfiguration } from 'aurelia-router';

export class App {
    router: Router;

    configureRouter(config: RouterConfiguration, router: Router) {
        config.title = 'Aurelia';
        config.map([
            { route: ['', 'login'], name: 'login', moduleId: 'App/Views/login', nav: true, title: 'Login' },
            { route: 'welcome', name: 'welcome', moduleId: 'App/Views/welcome', nav: false, title: 'Welcome' }
        ]);

        this.router = router;
    }
}
