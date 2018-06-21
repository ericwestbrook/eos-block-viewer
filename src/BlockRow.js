import React, { Component } from 'react'
import Markdown from 'react-markdown'
import EosApi from 'eosjs-api'

import './BlockRow.css';

const eos = EosApi({
  httpEndpoint: 'https://eos.greymass.com'
})

class BlockRow extends Component {
  constructor(props) {
    super(props)

    this.state = {
      details: {},
      raw_details: {},
      contracts: [],
      showDetails: false,
      fetching: false
    }
  }

  async getBlockDetails() {
    this.setState({
      fetching: true
    })

    let blockInfo = await eos.getBlock(this.props.blockId)
    var listBlockInfo = {
      id: blockInfo.id,
      timestamp: blockInfo.timestamp,
      transactions: 0
    }

    var contracts = []
    blockInfo.transactions.map(async (transaction, index) => {
      listBlockInfo.transactions += transaction.trx.transaction.actions.length

      let success = await transaction.trx.transaction.actions.map(async (action, index) => {
        let eosCode = await eos.getCode({
          account_name: action.account
        })
        const contractCode = eosCode.abi.actions.find((obj) => { return obj.name === action.name })
        contracts.push({
          account_name: eosCode.account_name,
          action_name: action.name,
          contract_code: contractCode.ricardian_contract
        })
      })

      return success
    })

    this.setState({
      details: listBlockInfo,
      raw_details: blockInfo,
      contracts: contracts,
      fetching: false
    })
  }

  async componentDidMount() {
    await this.getBlockDetails()
  }

  render() {
    return (
      <div
        className={'BlockRow ' + (this.props.expanded ? 'expanded ' : '') + (this.props.blockIndex % 2 === 0 ? 'odd' : 'even')}
        onClick={this.props.onClick}
      >
        <div className='BlockRow__details__wrapper'>
          <span className='BlockRow__details BlockRow__details--num'>
            {this.props.blockIndex + 1}
          </span>
          <span className='BlockRow__details BlockRow__details--hash'>
            {this.state.details.id}
          </span>
          <span className='BlockRow__details BlockRow__details--time'>
            {this.state.details.timestamp}
          </span>
          <span className='BlockRow__details BlockRow__details--actions'>
            {this.state.details.transactions}
          </span>
        </div>
        <div className='BlockRow__raw-data'>
          <pre onClick={(e) => e.stopPropagation()}>{JSON.stringify(this.state.raw_details, null, 2)}</pre>
          {this.state.details.transactions > 0 &&
            <div className='BlockRow__transactions'>
              <h3>Transaction Contracts:</h3>
              {this.state.contracts.map((contract, index) =>
                <div className='BlockRow__transactions__contract' key={index}>
                  <h4>Account Name: {contract.account_name}</h4>
                  <h4>Action Name: {contract.action_name}</h4>
                  <Markdown onClick={(e) => e.stopPropagation()}>
                    {contract.contract_code}
                  </Markdown>
                </div>
              )}
            </div>
          }
        </div>
      </div>
    );
  }
}

export default BlockRow;
