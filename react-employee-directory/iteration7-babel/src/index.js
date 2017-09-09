import React from 'react';
import ReactDOM from 'react-dom';
import EmployeeService from './EmployeeService';
import {EmployeePage} from './Employee';
import {HomePage} from './Template';
import Router from './Router';
import './css/styles.css';

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
            console.debug("m=home")
            this.setState({page: <HomePage searchKey={this.state.searchKey} searchHandler={this.searchHandler.bind(this)} employees={this.state.employees}/>});
        }.bind(this));
        this.router.addRoute('employees/:id', function(id) {
            console.debug('load employee', id)
            this.setState({page: <EmployeePage employeeId={id} service={this.employeeService}/>});
        }.bind(this));
        this.router.start();
    }

    render() {
        return this.state.page;
    }
};

ReactDOM.render(<App/>, document.getElementById("app"));
