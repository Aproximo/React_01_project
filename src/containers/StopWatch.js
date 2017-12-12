import React, { Component } from 'react'

export default class StopWatch extends Component {
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
   tick() {
        var elapsed = Date.now() - this.state.start + this.state.diff;
        this.setState({elapsed: elapsed});
    }
   getTimeSpan(elapsed) { // 754567(ms) -> "12:34.567"
        var m = String(Math.floor(elapsed/1000/60)+100).substring(1);
        var s = String(Math.floor((elapsed%(1000*60))/1000)+100).substring(1);
        var ms = String(elapsed % 1000 + 1000).substring(1);
        return m+":"+s+"."+ms;
    }
   onClick() {
        if(!this.state.isStart) { // start
            var timer = setInterval(this.tick, 33);
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
   render() {
        return (
            <div>
                <h1>{this.getTimeSpan(this.state.elapsed)}</h1>
                <button onClick={this.onClick} style={style.button}>
                    {this.state.isStart ? "pause" : "start"}
                </button>
            </div>
        );
    }
};
var style = {
    button: {
        fontSize: 20,
        height: 44,
        width: 88,
        margin: 5,
    }
};
