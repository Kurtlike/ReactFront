import React from "react";
import {funcDotsM1EX,funcDotsM1NM,funcDotsM2EX,funcDotsM2NM} from  '../../requests/MainRequest'
export default class ChartComponent extends React.Component{
    constructor(props) {
        super(props)
        this.canvas = React.createRef()
        this.chart = React.createRef()
        this.onMouseDown = this.onMouseDown.bind(this)
        this.onWheel = this.onWheel.bind(this)
    }
    componentDidMount() {
        this.canvas.current.width = this.chart.current.clientWidth;
        this.canvas.current.height = this.chart.current.clientHeight;
        this.setState({ctx: this.canvas.current.getContext("2d")}, ()=>{
            this.setState({
                xMax:  this.canvas.current.width,
                yMax: this.canvas.current.height,
                xMin: 0,
                yMin: 0,
                xNull:  this.canvas.current.width/2,
                yNull: this.canvas.current.height/2,
                scale: 100
            }, ()=>{
                this.updateCanvas();
            })

        })
    }
    updateCanvas() {
        this.state.ctx.clearRect(0, 0, this.canvas.current.width, this.canvas.current.height)
        this.setState(createXAxis(this.state));
        this.setState(createYAxis(this.state));
        drawFunc(this.state,funcDotsM1EX,"rgba(255,112,0,1)")
        drawFunc(this.state,funcDotsM1NM,"rgba(255,0,0,1)")
        drawFunc(this.state,funcDotsM2EX,"rgba(100,100,255,1)")
        drawFunc(this.state,funcDotsM2NM,"rgba(0,0,255,1)")

    }
    onMouseDown = (event) =>{
        let x1 = event.nativeEvent.offsetX;
        let y1 = event.nativeEvent.offsetY;
        let state = this.state
        let canvas = this.canvas;
        this.canvas.current.onmouseup = (event2) =>{
            canvas.current.onmousemove = {}
        }
        this.canvas.current.onmousemove = (event3) =>{
            let x3 = event3.offsetX;
            let y3 = event3.offsetY;
            let xNull = state.xNull + x3 - x1;
            let yNull = state.yNull - (y1 - y3)

            this.setState({xNull: xNull, yNull: yNull})
            this.updateCanvas()
        }
    }
    onWheel =(event) =>{
        let scale = this.state.scale + event.deltaY * -0.02 < 4? 4: this.state.scale + event.deltaY * -0.02 ;

        this.setState({scale: scale}, ()=> {
            console.log(this.state.scale)
            this.updateCanvas()
        })
    }

    render() {
        return <div
        id="chart"
        ref={this.chart}>
            <canvas
            id="canvas"
            onMouseDown={this.onMouseDown}
            onWheel={this.onWheel}
            ref={this.canvas}>
            </canvas>
        </div>
    }
}
function createXAxis(state) {
    setRegularCtxStyle(state.ctx);
    state.ctx.beginPath();
    state.ctx.moveTo( state.xNull,  state.yMax);
    state.ctx.lineTo( state.xNull,  state.yMin );
    state.ctx.closePath();
    state.ctx.stroke()
    state.ctx.fillText('0',state.xNull - 20, state.yNull + 20, 20 );
    let linesLessNull = (state.xNull - state.xMin) / state.scale;
    let linesMoreNull = (state.xMax - state.xNull) / state.scale;
    setDottedLineCtxStyle(state.ctx)
    function paintXLineLessNull(i) {
        state.ctx.beginPath();
        state.ctx.moveTo(state.xNull - state.scale * i, state.yMin);
        state.ctx.lineTo(state.xNull - state.scale * i, state.yMax);
        state.ctx.closePath();
        state.ctx.stroke();
        setRegularCtxStyle(state.ctx);
        state.ctx.fillText("-" + i, state.xNull - state.scale * i - 20, state.yNull + 20, 20);
        setDottedLineCtxStyle(state.ctx)
    }
    function paintXLineMoreNull(i) {
        state.ctx.beginPath();
        state.ctx.moveTo(state.xNull + state.scale * i, state.yMin);
        state.ctx.lineTo(state.xNull + state.scale * i, state.yMax);
        state.ctx.closePath();
        state.ctx.stroke();
        setRegularCtxStyle(state.ctx);
        state.ctx.fillText( i, state.xNull + state.scale * i - 20, state.yNull + 20, 20);
        setDottedLineCtxStyle(state.ctx)
    }
    for(let i = 1; i < linesLessNull; i++){
        if(state.scale > 70) {
            paintXLineLessNull(i);
        }
        else if(state.scale > 40) {
            if(i % 2 === 0) {
                paintXLineLessNull(i);
            }
        }
        else {
            if(i % 10 === 0) {
                paintXLineLessNull(i);
            }
        }
    }
    for(let i = 1; i < linesMoreNull; i++){
        if(state.scale > 70) {
            paintXLineMoreNull(i);
        }
        else if(state.scale > 40) {
            if(i % 2 === 0) {
                paintXLineMoreNull(i);
            }
        }
        else {
            if(i % 10 === 0) {
                paintXLineMoreNull(i);
            }
        }
    }
    return state;
}
function createYAxis(state) {
    setRegularCtxStyle(state.ctx);
    state.ctx.beginPath();
    state.ctx.moveTo(state.xMin, state.yNull);
    state.ctx.lineTo(state.xMax, state.yNull );
    state.ctx.closePath();
    state.ctx.stroke();
    let linesLessNull = ( state.yMax - state.yNull) / state.scale;
    let linesMoreNull = (state.yNull - state.yMin) / state.scale;
    setDottedLineCtxStyle(state.ctx)

    function paintYLineLessNull(i) {
        state.ctx.beginPath();
        state.ctx.moveTo(state.xMin, state.yNull + state.scale * i);
        state.ctx.lineTo(state.xMax, state.yNull + state.scale * i);
        state.ctx.closePath();
        state.ctx.stroke();
        setRegularCtxStyle(state.ctx);
        state.ctx.fillText("-" + i, state.xNull - 20, state.yNull + state.scale * i, 20);
        setDottedLineCtxStyle(state.ctx)
    }
    function paintYLineMoreNull(i) {
        state.ctx.beginPath();
        state.ctx.moveTo(state.xMin, state.yNull - state.scale * i);
        state.ctx.lineTo(state.xMax, state.yNull - state.scale * i);
        state.ctx.closePath();
        state.ctx.stroke();
        setRegularCtxStyle(state.ctx);
        state.ctx.fillText( i, state.xNull - 20, state.yNull - state.scale * i, 20);
        setDottedLineCtxStyle(state.ctx)
    }
    for(let i = 1; i < linesLessNull; i++){
        if(state.scale > 70) {
            paintYLineLessNull(i)
        }
        else if(state.scale > 40) {
            if(i % 2 === 0) {
                paintYLineLessNull(i);
            }
        }
        else {
            if(i % 10 === 0) {
                paintYLineLessNull(i);
            }
        }
    }
    for(let i = 1; i < linesMoreNull; i++){
        if(state.scale > 70) {
            paintYLineMoreNull(i);
        }
        else if(state.scale > 40) {
            if(i % 2 === 0) {
                paintYLineMoreNull(i);
            }
        }
        else {
            if(i % 10 === 0) {
                paintYLineMoreNull(i);
            }
        }
    }
    return state;
}


function setRegularCtxStyle(ctx){
    ctx.strokeStyle = "rgba(255,255,255,1)"
    ctx.fillStyle = "rgba(255, 255, 255, 1)";
    ctx.setLineDash([1, 1]);
}
function setDottedLineCtxStyle(ctx){
    ctx.setLineDash([4, 16]);
    ctx.strokeStyle = "rgba(255,255,255,.25)"
}
function drawFunc(state, dotset, colour){
    if(dotset.length > 0){
        state.ctx.setLineDash([1, 0]);
        state.ctx.strokeStyle = colour;
        state.ctx.lineWidth = 3;

        state.ctx.moveTo(dotset[0].x, dotset[0].y);
        state.ctx.beginPath();
        for (let j = 0; j < dotset.length; j++) {
            let x = state.xNull + state.scale * dotset[j].x;
            let y = state.yNull - state.scale * dotset[j].y;
            let dot = checkCoord(state,x, y);
            state.ctx.lineTo(dot.x, dot.y);
        }
        state.ctx.stroke();


        state.ctx.strokeStyle = "rgba(255,255,255,.25)";
        state.ctx.setLineDash([4, 16]);
        state.ctx.lineWidth = 1;
    }

}
function checkCoord(state,x, y){
    let newX = x;
    let newY = y;
    if(x > state.xMax) newX = state.xMax;
    if(x < state.xMin) newX = state.xMin;
    if(y > state.yMax) newY = state.yMax;
    if(y < state.yMin) newY = state.yMin;
    return {
        x: newX,
        y: newY
    };
}