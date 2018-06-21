import React, { Component } from 'react';
import * as EosApi from 'eosjs-api'

import './BlockRow.css';

const eos = EosApi({
  httpEndpoint: 'https://eos.greymass.com'
})

class BlockRow extends Component {
  constructor(props) {
    super(props)

    this.state = {
      details: {},
      showDetails: false,
      fetching: false
    }
  }

  async getBlockDetails() {
    this.setState({
      fetching: true
    })
    let blockInfo = await eos.getBlock(this.props.blockId)
    this.setState({
      details: blockInfo,
      fetching: false
    })
    console.log(blockInfo)
  }

  componentDidMount() {
    this.getBlockDetails()
  }

  render() {
    return (
      <tbody
        className={'BlockRow ' + (this.props.expanded ? 'expanded' : '')}
        onClick={this.props.onClick}
      >
        <tr>
          <td>{this.props.blockIndex + 1}</td>
          <td>{this.state.details.id}</td>
          <td>{this.state.details.timestamp}</td>
          <td>{this.state.details.transactions ? this.state.details.transactions.length : 0}</td>
        </tr>
        <tr className='BlockRow__raw-data'>
          <td colSpan={4}>
            {/* <code>{JSON.stringify(this.state.details)}</code> */}
            test
          </td>
        </tr>
      </tbody>
    );
  }
}

export default BlockRow;
