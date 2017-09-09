import React from 'react';
import {EmployeeList} from './Employee';
import Router from './Router';

export class SearchBar extends React.Component {

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

export class Header extends React.Component {
    render() {
        return (
            <header className="bar bar-nav">
                <a href="/" onClick={Router.loadPage} className={"icon icon-left-nav pull-left" + (this.props.back==="true"?"":" hidden")}></a>
                <h1 className="title">{this.props.text}</h1>
            </header>
        );
    }
}

export class HomePage extends React.Component {
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
}
