import React, { Component } from 'react'

export default class Page extends Component {
    constructor(props) {
        super(props);
        this.state = { btn_flag: false,
            isStart: false,
            elapsed: 0,
            diff: 0,
            };

        this.componentWillUnmount = this.componentWillUnmount.bind(this);
        this.tick = this.tick.bind(this);
        this.onClick = this.onClick.bind(this);

    }
    componentWillUnmount() { // clear timer
        clearInterval(this.state.timer);
        this.setState({timer: undefined});
    }
    tick() {
        let elapsed = Date.now() - this.state.start + this.state.diff;
        this.setState({elapsed: elapsed});
    }
    getTimeSpan(elapsed) { // 754567(ms) -> "12:34.567"
        let m = String(Math.floor(elapsed/1000/60)+100).substring(1);
        let s = String(Math.floor((elapsed%(1000*60))/1000)+100).substring(1);
        let ms = String(elapsed % 1000 + 1000).substring(1);
        return m+":"+s+"."+ms;
    }
    onClick() {
        if(!this.state.isStart) { // start
            let timer = setInterval(this.tick, 33);
            this.setState({
                isStart: true,
                timer: timer,
                start: new Date(),
            });
        } else { // pause
            clearInterval(this.state.timer);
            this.setState({
                timer: undefined,
                isStart: false,
                diff: this.state.elapsed,
            });
        }
    }
    onStartBtnClick(e) {
        this.setState({btn_flag: true});

  }
  render() {

   let tasks =  this.props.page.map(function(item) {
       return (
           <tr key={item.id}>
               <td><button onClick={() => this.onClick} style={style.button}>
                   {this.state.isStart ? "pause" : "start"}
               </button></td>
               <td><h1>{this.getTimeSpan(this.state.elapsed)}</h1></td>
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
        <button onClick={this.onStartBtnClick.bind(this)}>Add Task</button>
      </div>
  }
}
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
