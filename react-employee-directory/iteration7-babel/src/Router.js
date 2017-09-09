export default class Router {

    static instance;

    constructor(){
        console.debug('m=router');
        this.routes = [];
    }

    addRoute(route, handler) {
        console.debug('m=addRoute, route=%s', route)
        this.routes.push({path: route, parts: route.split('/'), handler: handler});
    }

    load(route) {
        console.debug('m=load, route=%s', route)
        window.location.hash = route;
    }

    static loadPage(e) {
        console.log('The link was clicked. %o', e.currentTarget, e.currentTarget.getAttribute('href'));
        e.preventDefault();
        Router.getInstance().start(e.currentTarget.getAttribute('href'), e.currentTarget.getAttribute('title'))
    }

    start(path, title) {

        if(!path){
            path = document.location.pathname
        }
        console.debug('m=start, routes=%o, path=%s', this.routes, path)

        var filteredRoute = this.routes.filter(r => Router.getRegex(r.path).test(path))
        if (filteredRoute.length == 0) {
            return
        }
        console.debug('m=start, filteredRoute=%o', filteredRoute);

        var route = filteredRoute[0];
        var params = this.getMatches(Router.getRegex(route.path), path);
        console.debug('m=start, params=%o', params);
        route.handler.apply(undefined, params);
        console.debug('load', window.History)
        window.History.pushState({}, title, path);
    }

    static getRegex(exp){
        return RegExp("^" + exp + "$", "g")
    }

    static getInstance(){
        if (!Router.instance){
            Router.instance = new Router
        }
        return Router.instance
    }

    getMatches(regex, str){
        var r;
        while(r = regex.exec(str)){
            return r.slice(1);
        }
        return null;
    }

}
