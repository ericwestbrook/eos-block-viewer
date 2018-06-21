import React, { Component } from 'react';
import EosApi from 'eosjs-api'
import logo from './logo.svg';
import {Button} from 'react-bootstrap'
import BlockResults from './BlockResults'
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
    const selectedRow = this.state.blocks[index] === this.state.selectedRow ? '' : this.state.blocks[index]
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
        <BlockResults>
          {this.state.blocks.map((block, index) =>
            <BlockRow
              blockId={block}
              onClick={() => this.selectRow(index)}
              blockIndex={index}
              key={index}
              expanded={this.state.selectedRow === block}
            />
          )}
        </BlockResults>
      </div>
    );
  }
}

export default App;
