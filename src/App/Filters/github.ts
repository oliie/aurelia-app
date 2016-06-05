export class GithubValueConverter {
    toView(value) {
        return '@' + value;
    }

    fromView(value) {
        return value.replace('@', '');
    }
}
