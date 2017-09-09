export default class Router {

    constructor(){
        console.debug('m=router');
        this.routes = [];
        window.onhashchange = this.start.bind(this);
    }

    addRoute(route, handler) {
        console.debug('m=addRoute, route=%s', route)
        this.routes.push({parts: route.split('/'), handler: handler});
    }

    load(route) {
        console.debug('m=load, route=%s', route)
        window.location.hash = route;
    }

    start() {

        console.debug('m=start, routes=%o', this.routes)
        var path = window.location.hash.substr(1),
            parts = path.split('/'),
            partsLength = parts.length;

        for (var i = 0; i < this.routes.length; i++) {
            var route = this.routes[i];
            if (route.parts.length === partsLength) {
                var params = [];
                for (var j = 0; j < partsLength; j++) {
                    if (route.parts[j].substr(0, 1) === ':') {
                        params.push(parts[j]);
                    } else if (route.parts[j] !== parts[j]) {
                        break;
                    }
                }
                if (j === partsLength) {
                    route.handler.apply(undefined, params);
                    return;
                }
            }
        }
    }

}
