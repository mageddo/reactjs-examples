import React from 'react';

export class RecordTableRow extends React.Component {

  constructor(props){
    super();
    this.props = props;
    this.lastPrice = this.props.row.v.price; 
  }

  componentWillUpdate(nextProps, nextState){
//    if(this.props.row.v.price != nextProps.row.v.price){
// creating a new variable to compare instead of just use the IF above, because $row can be
//  re utilized instead of create a new one, then the two will have the same reference, then condition will always be false
    if(this.lastPrice != nextProps.row.v.price){
      this.color = "red";
    } else {
      this.color = "black";
    }
  }


  loadStyle(){
    return {color: this.color};
  }

  render(){
    let row = this.props.row;
    return <tr key={row.k}>
      <th scope="row">{row.k}</th>
      <td>{row.v.stock}</td>
      <td style={this.loadStyle()} >{row.v.price.toFixed(2)}</td>
    </tr>
  }
}