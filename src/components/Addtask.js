import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { AddNewTask } from '../actions/PageActions'



class Addtask extends Component
{
    addTrack() {
        this.props.onAddTrack(this.trackInput.value);
        this.trackInput.value = '';
    }

    render(){
        return (
            <div>
                <input type="text" ref={(input) => { this.trackInput = input }} />
                <button onClick={this.addTrack.bind(this)}>Add track</button>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    page: state.page
});

const mapDispatchToProps = dispatch => ({
    onAddTrack: bindActionCreators(AddNewTask, dispatch)
});

export default connect(mapStateToProps,mapDispatchToProps)(Addtask);

