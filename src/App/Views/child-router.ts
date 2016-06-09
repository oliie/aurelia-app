import {Router, RouterConfiguration} from 'aurelia-router';

export class ChildRouter {
    heading = 'Child Router';
    router: Router;

    configureRouter(config: RouterConfiguration, router: Router) {
        config.map([
            { route: ['', 'welcome'], name: 'welcome',       moduleId: 'App/Views/welcome',      nav: true, title: 'Welcome' },
            { route: 'users',         name: 'users',         moduleId: 'App/Views/users',        nav: true, title: 'Github Users' },
            { route: 'child-router',  name: 'child-router',  moduleId: 'App/Views/child-router', nav: true, title: 'Child Router' },
            { route: 'custom-form',    name: 'custom-form',  moduleId: 'App/Views/custom-form',  nav: true, title: 'Custom Form' }
        ]);

        this.router = router;
    }
}
