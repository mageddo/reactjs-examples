import React from 'react';
import ReactDOM from 'react-dom';
import EmployeeService from './EmployeeService';

class Router {

    constructor(){
        this.routes = [];
        window.onhashchange = this.start;
    }

    addRoute(route, handler) {
        this.routes.push({parts: route.split('/'), handler: handler});
    }

    load(route) {
        window.location.hash = route;
    }

    start() {

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

class EmployeeListItem extends React.Component {
    render() {
        return (
            <li className="table-view-cell media">
                <a href={"#employees/" + this.props.employee.id}>
                    <img className="media-object small pull-left" src={"pics/" + this.props.employee.firstName + "_" + this.props.employee.lastName + ".jpg" }/>
                    {this.props.employee.firstName} {this.props.employee.lastName}
                    <p>{this.props.employee.title}</p>
                </a>
            </li>
        );
    }
}

class EmployeeList extends React.Component {
    render() {
        var items = this.props.employees.map(function (employee) {
            return (
                <EmployeeListItem key={employee.id} employee={employee} />
            );
        });
        return (
            <ul  className="table-view">
                {items}
            </ul>
        );
    }
}

class SearchBar extends React.Component {

    constructor () {
        super()
        this.state = {searchKey: ""};
    }
    searchHandler(event) {
        var searchKey = event.target.value;
        this.setState({searchKey: searchKey});
        this.props.searchHandler(searchKey);
    }
    render() {
        return (
            <div className="bar bar-standard bar-header-secondary">
                <input type="search" value={this.state.symbol} onChange={this.searchHandler.bind(this)}/>
            </div>
        );
    }
}

class Header extends React.Component {
    render() {
        return (
            <header className="bar bar-nav">
                <a href="#" className={"icon icon-left-nav pull-left" + (this.props.back==="true"?"":" hidden")}></a>
                <h1 className="title">{this.props.text}</h1>
            </header>
        );
    }
};

class HomePage extends React.Component {
    render() {
        return (
            <div>
                <Header text="Employee Directory" back="false"/>
                <SearchBar searchKey={this.props.searchKey} searchHandler={this.props.searchHandler}/>
                <div className="content">
                    <EmployeeList employees={this.props.employees}/>
                </div>
            </div>
        );
    }
};


class App extends React.Component{

    constructor() {
        super()
        this.router = new Router
        this.employeeService = new EmployeeService
        this.state = {
            searchKey: '',
            employees: [],
            page: null
        };
    }

    searchHandler(searchKey) {
        this.employeeService.findByName(searchKey).done(function(employees) {
            this.setState({searchKey:searchKey, employees: employees, page: <HomePage searchKey={searchKey} searchHandler={this.searchHandler.bind(this)} employees={employees}/>});
        }.bind(this));
    }

    componentDidMount() {
        this.router.addRoute('', function() {
            this.setState({page: <HomePage searchKey={this.state.searchKey} searchHandler={this.searchHandler.bind(this)} employees={this.state.employees}/>});
        }.bind(this));
        this.router.addRoute('employees/:id', function(id) {
//            this.setState({page: <EmployeePage employeeId={id} service={employeeService}/>});
        }.bind(this));
        this.router.start();
    }

    render() {
        return this.state.page;
    }
};

ReactDOM.render(<App/>, document.body);
