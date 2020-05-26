import React from 'react';

import {RecordTableRow} from './RecordTableRow';

export class RecordTable extends React.Component {
  
  constructor(props){
    super();
    this.state = {
      stocks: []
    };
    console.info("starting....");
  }

  componentDidMount(){
    console.info("mounted");
    let that = this;

    let stocks = [];
    for(var i=0; i < 1000; i++){
      stocks.push({
        stock: 'S-' + i,
        price: Math.random() * 20
      });
    }

    that.setState({
      stocks: stocks
    });

    setInterval(function(){
      let howMuchUpdate = parseInt(Math.random() * 999);
      for(let i=0; i < howMuchUpdate; i++){
        let whichIndexUpdate = parseInt(Math.random() * 999);
        stocks[whichIndexUpdate].price = Math.random() * 20;
      }
      that.setState({
        stocks: stocks
      });
      console.info('updating stocks...');
    }, 1000);
  }

  render(){
    return <div>
      <table className="table table-bordered table-striped">
        <thead className="thead-dark">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Stock</th>
            <th scope="col">Price</th>
          </tr>
        </thead>
        <tbody>
          {
            this.state.stocks.map((v, k) => {
              return <RecordTableRow key={k} row={{k: k, v: v}} />
            })
          }
        </tbody>
      </table>
    </div>
  }
}