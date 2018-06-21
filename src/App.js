import React, { Component } from 'react';
import * as EosApi from 'eosjs-api'
import logo from './logo.svg';
import {Button, Table} from 'react-bootstrap'
import BlockRow from './BlockRow'

import './App.css';

const eos = EosApi({
  httpEndpoint: 'https://eos.greymass.com'
})

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      'blocks': [],
      'selectedRow': '',
      'fetching': false
    }
  }

  async getBlocks() {
    this.setState({
      blocks: [],
      selectedRow: '',
      fetching: true
    })
    let chainInfo = await eos.getInfo({})
    const latestBlock = chainInfo.head_block_num
    var latestBlocks = []
    for (let i = 0; i < 10; i++) {
      latestBlocks.push(latestBlock - i)
    }
    this.setState({
      blocks: latestBlocks,
      fetching: false
    })
  }

  selectRow(index) {
    console.log('clicky')
    const selectedRow = this.state.blocks[index] == this.state.selectedRow ? '' : this.state.blocks[index]
    console.log('selectedRow: ', selectedRow)
    this.setState({
      selectedRow: selectedRow
    })
  }

  componentDidMount() {
    this.getBlocks()
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Last 10 EOS blocks</h1>
        </header>
        <p className="App-intro">
          Press the "LOAD" button to refresh.
        </p>
        <Button bsSize="large" bsStyle="primary" onClick={() => this.getBlocks()}>LOAD</Button>
        <div className="App-results">
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>#</th>
                <th>Hash</th>
                <th>Timestamp</th>
                <th># actions</th>
              </tr>
            </thead>
            {this.state.blocks.map((block, index) =>
              <BlockRow
                blockId={block}
                onClick={() => this.selectRow(index)}
                blockIndex={index}
                key={index}
                expanded={this.state.selectedRow == block}
              />
            )}
          </Table>
        </div>
      </div>
    );
  }
}

export default App;
