
// var CommentBox = React.createClass({
//   render: function() {
//     return (
//       React.createElement('div', {className: "commentBox"},
//         "Hello, world! I am a CommentBox."
//       )
//     );
//   }
// });

var MainComment = React.createClass({
  render: function() {
    return (
        // <CommentBox />
        React.createElement('h1', {'data-my': "abcd", id: "rathanak", className: "headerH1"}, <CommentBox />)
      );
  }
});