import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {toDomXCoord_Linear, toDomYCoord_Linear} from "plot-utils";

const COLOR_MAP = {
  "0-100": "#ed887f",
  "25-75": "#feca8b",
  "50": "#8fcc7f",
  };

class PercentilePlot extends PureComponent {
  constructor(props) {
    super(props);
    this.ref = React.createRef();
  }

  render() {
    let {width,height} = this.props;
    return (
      <canvas ref={this.ref}
              width={width} height={height}
              style={{width:width,height:height,display:"block"}}>
      </canvas>
    );
  }

  componentDidMount() {
    this.draw();
  }

  componentDidUpdate() {
    this.draw();
  }

  draw() {
    let {data,width,height,minX,maxX,minY,maxY} = this.props;
    let canvas = this.ref.current;
    let ctx = canvas.getContext("2d");
    // Clear plot
    ctx.clearRect(0,0,width,height);
    // Draw
    let time = data.map( (rec)=>rec["time"] );
    let p0 = data.map( (rec)=>rec["0"] );
    let p25 = data.map( (rec)=>rec["25"] );
    let p50 = data.map( (rec)=>rec["50"] );
    let p75 = data.map( (rec)=>rec["75"] );
    let p100 = data.map( (rec)=>rec["100"] );
    // Coord Conv
    time = time.map( x=>toDomXCoord_Linear(width,minX,maxX,x) );
    p0 = p0.map( x=>toDomYCoord_Linear(height,minY,maxY,x) );
    p25 = p25.map( x=>toDomYCoord_Linear(height,minY,maxY,x) );
    p50 = p50.map( x=>toDomYCoord_Linear(height,minY,maxY,x) );
    p75 = p75.map( x=>toDomYCoord_Linear(height,minY,maxY,x) );
    p100 = p100.map( x=>toDomYCoord_Linear(height,minY,maxY,x) );
    // 0-100
    this.drawArea(ctx,width,height,time,p0,p100,COLOR_MAP["0-100"]);
    // 25-75
    this.drawArea(ctx,width,height,time,p25,p75,COLOR_MAP["25-75"]);
    // 50
    this.drawLine(ctx,width,height,time,p50,COLOR_MAP["50"]);
  }

  drawArea(ctx,width,height,x,y1,y2,fillStyle){
    ctx.beginPath();
    ctx.moveTo(x[0],y1[0]);
    for (let i=0,j=1; j<y1.length; i++,j++) {
      let xMiddle = (x[j]+x[i])/2;
      ctx.bezierCurveTo(xMiddle,y1[i], xMiddle,y1[j], x[j],y1[j]);
    }
    ctx.lineTo(x[y2.length-1],y2[y2.length-1]);
    for (let i=y2.length-1, j=y2.length-2; i>=0; i--,j--) {
      let xMiddle = (x[j]+x[i])/2;
      ctx.bezierCurveTo(xMiddle,y2[i], xMiddle,y2[j], x[j],y2[j]);
    }
    ctx.closePath();
    ctx.fillStyle = fillStyle;
    ctx.fill();
  }

  drawLine(ctx,width,height,x,y,stokeStyle) {
    ctx.beginPath();
    ctx.moveTo(x[0],y[0]);
    for (let i=0,j=1; j<y.length; i++,j++) {
      let xMiddle = (x[j]+x[i])/2;
      ctx.bezierCurveTo(xMiddle,y[i], xMiddle,y[j], x[j],y[j]);
    }
    ctx.strokeStyle = stokeStyle;
    ctx.lineWidth = 3;
    ctx.stroke();
  }
}

PercentilePlot.propTypes = {
  data: PropTypes.array.isRequired,
  minX: PropTypes.number.isRequired,
  maxX: PropTypes.number.isRequired,
  minY: PropTypes.number.isRequired,
  maxY: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
}

export default PercentilePlot;
