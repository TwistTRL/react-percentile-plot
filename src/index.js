import React, { Component } from "react";
import ReactDOM from 'react-dom';
import PercentilePlot from "./lib";

const DATA = [...new Array(1000).keys()].map(i =>
  ({
    "time": i * 10,
    "0": 10 * Math.random() + 10,
    "25": 10 * Math.random() + 20,
    "50": 10 * Math.random() + 50,
    "75": 10 * Math.random() + 80,
    "100": 10 * Math.random() + 90,
  })
);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: 800,
      height: 400,
      minX: 0,
      maxX: 800,
      minY: 0,
      maxY: 400,
    };
  }

  render() {
    let { height, width, minX, maxX, minY, maxY } = this.state;
    return (
      <>
        <fieldset>
          <legend>Props</legend>
          <div>
            width
            <input type="range" min={800} max={1200} value={width}
              onChange={ev => this.setState({ width: Number.parseInt(ev.target.value) })}
            />
            {width}
          </div>
          <div>
            height
            <input type="range" min={200} max={400} value={height}
              onChange={ev => this.setState({ height: Number.parseInt(ev.target.value) })}
            />
            {height}
          </div>
          <div>
            minX
            <input type="range" min={0} max={maxX} value={minX}
              onChange={ev => this.setState({ minX: Number.parseInt(ev.target.value) })}
            />
            {minX}
          </div>
          <div>
            maxX
            <input type="range" min={minX} max={2000} value={maxX}
              onChange={ev => this.setState({ maxX: Number.parseInt(ev.target.value) })}
            />
            {maxX}
          </div>
          <div>
            minY
            <input type="range" min={0} max={maxY} value={minY}
              onChange={ev => this.setState({ minY: Number.parseInt(ev.target.value) })}
            />
            {minY}
          </div>
          <div>
            maxY
            <input type="range" min={minY} max={200} value={maxY}
              onChange={ev => this.setState({ maxY: Number.parseInt(ev.target.value) })}
            />
            {maxY}
          </div>
        </fieldset>
        <fieldset>
          <legend>Result</legend>
          <PercentilePlot
            data={DATA}
            lineToDraw={"50"}
            height={height}
            width={width}
            minX={minX}
            maxX={maxX}
            minY={minY}
            maxY={maxY}
          />
        </fieldset>
      </>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
