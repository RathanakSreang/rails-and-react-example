var MainComment = React.createClass({
  render: function() {
    var itemInfo = "Rathanak a";
    return (
        React.createElement('h1', {'data-my': "abcd", id: "rathanak", className: "headerH1"}, itemInfo)
      );
  }
});