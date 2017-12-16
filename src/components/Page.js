import React, { Component } from 'react'
import {connect} from "react-redux";
import { bindActionCreators } from 'redux';

import { PauseClick, StartClick, DeleteClick, ArrayMove, taskDone } from "../actions/PageActions";
import {SortableContainer, SortableElement} from "react-sortable-hoc";


const SortableItem = SortableElement(({value}) =>
    <li>{value}</li>
);

const SortableList = SortableContainer(({items}) => {
    return (
        <ul>
            {items.map((value, index) => (
                <SortableItem key={`item-${index}`} index={index} value={value} />
            ))}
        </ul>
    );
});


class Page extends Component {
    constructor(props) {
        super(props);
        this.state = {
            active: false,
            isStart: false,
        };
        this.componentWillUnmount = this.componentWillUnmount.bind(this);
        this.tick = this.tick.bind(this);
        this.onClick = this.onClick.bind(this);
        this.checkboxClick = this.checkboxClick.bind(this);

    }

    componentWillUnmount() { // clear timer
        clearInterval(this.state.timer);
        this.setState({timer: undefined});
    }
    tick(item) {
        let elapsed = Date.now() - this.state.start + item.diff;
        this.props.onStartClick(item.id, elapsed);
    }
    getTimeSpan(elapsed) { 
        let h = String(Math.floor(elapsed/1000/60/60)+100).substring(1);
        let m = String(Math.floor(elapsed/1000/60)+100).substring(1);
        let s = String(Math.floor((elapsed%(1000*60))/1000)+100).substring(1);

        return h+":"+m+":"+s;
    }

    onClick(id, item) {

        if(!item.isStart) { // start
            let timer = setInterval(()=>this.tick(item), 33);
            this.setState({
                timer: timer,
                start: new Date(),
                active: true
            });
            this.props.onStartClick(id);
        } else { // pause
            clearInterval(this.state.timer);
            this.props.onPauseClick(id, item.diff);
            this.setState({
                active: false
            });
        }
    }

    onSortEnd = ({oldIndex, newIndex}) => {
        this.props.onArrayMove(oldIndex, newIndex)
        // this.setState({
        //     items: arrayMove(this.props.page, oldIndex, newIndex),
        // });
    };
    checkboxClick = (id, v) => {
        this.props.onSetDone(id);
    };

  render() {


      var tasks =  this.props.page.map((item, index) => {
       return (

               <span className={+item.done ? "done" : "pag"}>
                   <button onClick={() => this.onClick(item.id, item)} style={style.button} disabled={(this.state.active && !item.isStart) ? "true" : ""} className={item.done ? "hide" : ""}>
                   {item.isStart ? "pause" : "start"}
                   </button>
                   <span>{this.getTimeSpan(item.diff)}</span>
                   <span>{item.taskName}</span>
                   <span>{item.entries}</span>
                   <input id={index+"_cb"} type="checkbox" onClick={() => this.checkboxClick(item.id, item.done)}/>
                   <label className="label" htmlFor="cb">done</label>
                   <button onClick={() => this.props.onDeleteClick(index)}>delete</button>
               </span>

       )
   });
    return <div>
        <SortableList items={tasks} onSortEnd={this.onSortEnd} />
      </div>
  }
}

const mapStateToProps = (state) => {
    return { page: state.page };
};

const mapDispatchToProps = dispatch => ({
    onPauseClick: bindActionCreators(PauseClick, dispatch),
    onStartClick: bindActionCreators(StartClick, dispatch),
    onDeleteClick: bindActionCreators(DeleteClick, dispatch),
    onArrayMove: bindActionCreators(ArrayMove, dispatch),
    onSetDone: bindActionCreators(taskDone, dispatch),
});

export default connect(mapStateToProps,mapDispatchToProps)(Page);


var style = {
    button: {
        fontSize: 20,
        height: 44,
        width: 88,
        margin: 5,
    }
};








