var Timer = React.createClass({
  getInitialState: function() {
    return {secondsElapsed: 0, name: "Rathanak Jame"};
  },
  tick: function() {
    this.setState({secondsElapsed: this.state.secondsElapsed + 1});
  },
  componentDidMount: function() {
    this.interval = setInterval(this.tick, 100);
  },
  componentWillUnmount: function() {
    clearInterval(this.interval);
  },
  render: function() {
    return (<div>{this.state.name}: {this.state.secondsElapsed}</div>);
  }
});