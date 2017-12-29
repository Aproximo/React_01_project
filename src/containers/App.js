import React, { Component } from 'react';

import Page from '../components/Page';
import Addtask from '../components/Addtask';


class App extends Component {
  render() {
    return <div className='row'>
      <Page/>
      <Addtask></Addtask>
    </div>
  }
}

export default (App)
