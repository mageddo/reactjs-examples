import React from 'react';

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
    setInterval(function(){
      let stocks = [];
      for(var i=0; i < 1000; i++){
        stocks.push({
          stock: 'S-' + i,
          price: Math.random() * 20
        });
      }
      that.setState({
        stocks: stocks
      })
      console.info('updating stocks...');
    }, 1000);
  }

  loadStyle(){
    return {color: "red"};
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
              return <tr key={k}>
                <th scope="row">{k}</th>
                <td>{v.stock}</td>
                <td style={this.loadStyle()} onChange={e => console.info("changed", e)}>{v.price.toFixed(2)}</td>
              </tr>
            })
          }
        </tbody>
      </table>
    </div>
  }
}