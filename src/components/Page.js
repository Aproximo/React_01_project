import React, { Component } from 'react'
import {connect} from "react-redux";
import { bindActionCreators } from 'redux'

import { PauseClick, StartClick } from "../actions/PageActions";

class Page extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isStart: false,
            elapsed: 0,
            diff: 0,
            laps: [],
        };
        this.componentWillUnmount = this.componentWillUnmount.bind(this);
        this.tick = this.tick.bind(this);
        this.onClick = this.onClick.bind(this);

    }
    componentWillUnmount() { // clear timer
        clearInterval(this.state.timer);
        this.setState({timer: undefined});
    }
    tick(item) {
        let elapsed = Date.now() - this.state.start + item.diff;
        this.props.onStartClick(item.id, elapsed);
    }
    getTimeSpan(elapsed) { // 754567(ms) -> "12:34.567"
        let h = String(Math.floor(elapsed/1000/60/60)+100).substring(1);
        let m = String(Math.floor(elapsed/1000/60)+100).substring(1);
        let s = String(Math.floor((elapsed%(1000*60))/1000)+100).substring(1);
        // let ms = String(elapsed % 1000 + 1000).substring(1);

        return h+":"+m+":"+s;
    }

    onClick(id, item) {

        if(!item.isStart) { // start
            let timer = setInterval(()=>this.tick(item), 33);
            this.setState({
                isStart: true,
                timer: timer,
                start: new Date(),
            });
            this.props.onStartClick(id);
        } else { // pause
            clearInterval(this.state.timer);
            this.props.onPauseClick(id, this.state.elapsed);
            console.log(this.props.page)

        }
    }


  render() {

      let tasks =  this.props.page.map(item => {
       return (
           <tr key={item.id}>
               <td><button onClick={() => this.onClick(item.id, item)} style={style.button}>
                   {item.isStart ? "pause" : "start"}
               </button></td>
               <td><h1>{this.getTimeSpan(item.diff)}</h1></td>
               <td>{item.taskName}</td>
               <td>{item.entries}</td>
               <td className = 'hide'>{item.taskBody}</td>
           </tr>
       )
   });
    return <div className='ib page'>
        <table border="1">
            <thead>
            <tr>
                <td>start/stop</td>
                <td>time</td>
                <td>task name</td>
                <td>entries</td>
            </tr>
            </thead>
            <tbody>
                {tasks}
            </tbody>
        </table>
      </div>
  }
}

const mapStateToProps = state => ({
    page: state.page
});

const mapDispatchToProps = dispatch => ({
    onPauseClick: bindActionCreators(PauseClick, dispatch),
    onStartClick: bindActionCreators(StartClick, dispatch)
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

// Page.propTypes = {
//   year: PropTypes.number.isRequired,
//   photos: PropTypes.array.isRequired,
//   getPhotos: PropTypes.func.isRequired
// };
