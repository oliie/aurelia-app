import 'bootstrap';
import { Aurelia } from 'aurelia-framework';

export function configure(aurelia: Aurelia) {
    aurelia.use
        .standardConfiguration()
        .developmentLogging()
        .globalResources([
            'App/Filters/my-filter',
            'App/Filters/github'
        ])
        // https://github.com/aurelia/validation/tree/sunset-0.6.0
        .plugin('aurelia-validation');

    // Uncomment the line below to enable animation.
    aurelia.use.plugin('aurelia-animator-css');
    // aurelia.use.plugin('gooy/aurelia-animator-velocity');

    // Anyone wanting to use HTMLImports to load views, will need to install the following plugin.
    // aurelia.use.plugin('aurelia-html-import-template-loader')

    aurelia.start().then(() => aurelia.setRoot());
}
