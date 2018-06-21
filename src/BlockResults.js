import React, { Component } from 'react'

import './BlockResults.css';

class BlockRow extends Component {
  render() {
    return (
      <div className='BlockResults'>
        <div className='BlockResults__header__wrapper'>
          <h2 className='BlockResults__header BlockResults__header--num'>
            #
          </h2>
          <h2 className='BlockResults__header BlockResults__header--hash'>
            Hash
          </h2>
          <h2 className='BlockResults__header BlockResults__header--time'>
            Timestamp
          </h2>
          <h2 className='BlockResults__header BlockResults__header--actions'>
            # Actions
          </h2>
        </div>
        <div className='BlockResults__content'>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default BlockRow;
