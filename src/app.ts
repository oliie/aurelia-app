import {Router, RouterConfiguration} from 'aurelia-router';

export class App {
    router: Router;

    configureRouter(config: RouterConfiguration, router: Router) {
        config.title = 'Aurelia';
        config.map([
            { route: ['', 'welcome'], name: 'welcome',      moduleId: 'App/Views/Welcome/welcome',          nav: true, title: 'Welcome' },
            { route: 'login',         name: 'login',        moduleId: 'App/Views/Login/login',              nav: true, title: 'Login' },
            { route: 'users',         name: 'users',        moduleId: 'App/Views/Users/users',              nav: true, title: 'Github Users' },
            { route: 'child-router',  name: 'child-router', moduleId: 'App/Views/ChildRouter/child-router', nav: true, title: 'Child Router' },
            { route: 'custom-form',   name: 'custom-form',  moduleId: 'App/Views/CustomForm/custom-form',   nav: true, title: 'Custom Form' }

        ]);

        this.router = router;
    }
}
