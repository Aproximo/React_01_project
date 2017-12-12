import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Page from '../components/Page'
import * as pageActions from '../actions/PageActions'

class App extends Component {
  render() {
    const { page } = this.props;
    const showTask = this.props.pageActions;


    return <div className='row'>
      <Page page={page}  showTask={showTask}/>
    </div>
  }
}

function mapStateToProps(state) {
  return {
    page: state.page
  }
}

function mapDispatchToProps(dispatch) {
  return {
    pageActions: bindActionCreators(pageActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
