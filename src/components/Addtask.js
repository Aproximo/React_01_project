import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { AddNewTask } from '../actions/PageActions';



class Addtask extends Component
{
    addTrack() {
        if (this.trackInput.value.trim()) {
            this.props.onAddTrack(this.trackInput.value);
            this.trackInput.value = '';
        } else {
            alert("empty task name");
        }
    }

    render(){
        return (
            <div>
                <input type="text" ref={(input) => { this.trackInput = input }} />
                <button onClick={this.addTrack.bind(this)}>Add task</button>
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

