var CommentBox = React.createClass({displayName: 'CommentBox',
  getInitialState: function(){
    return {data: []}
  },
  loadCommentsFromServer: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err){
        console.erre(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  componentDidMount: function() {
    this.loadCommentsFromServer();
    setInterval(this.loadCommentsFromServer, this.props.pollInterval);
  },
  handleCommentSubmit: function(comment) {
    var comments = this.state.data;
    comment.id = Date.now();
    var newComments = comments.concat([comment]);
    this.setState({data: newComments});
     $.ajax({
      url: this.props.url,
      dataType: 'json',
      type: 'POST',
      data: comment,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        this.setState({data: comments});
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  render: function() {
    return (React.createElement('div', {className: "commentBox"},
      React.createElement('h1', "Comments"),
      React.createElement(CommentList, {data: this.state.data}),
      React.createElement(CommentForm, {onCommentSubmit: this.handleCommentSubmit}))
    );
  }
});
var CommentList = React.createClass({
  render: function() {
    var commentNodes = this.props.data.map(function(comment) {
      return (React.createElement(Comment, {author: comment.author, key: comment.id}, comment.text));
    });
    return (React.createElement('div', {className: 'commentList'}, commentNodes));
  }
});
var CommentForm = React.createClass({
  getInitialState: function() {
    return {author: '', text: ''};
  },
  handleAuthorChange: function(e) {
    this.setState({author: e.target.value});
  },
  handleTextChange: function(e) {
    this.setState({text: e.target.value});
  },
  handleSubmit: function(e) {
    e.preventDefault();
    var author = this.state.author.trim();
    var text = this.state.text.trim();
    if(!text || ! author){
      return;
    }
    this.props.onCommentSubmit({author: author, text: text});
    this.setState({author: '', text: ''});
  },
  render: function(){
    return(React.createElement('form', {className: 'commentForm', onSubmit: this.handleSubmit},
      React.createElement('input', {type: 'text', placeholder: 'your name', value: this.state.author, onChange: this.handleAuthorChange}),
      React.createElement('input', {type: 'text', placeholder: 'Say Something ..', value: this.state.text, onChange: this.handleTextChange}),
      React.createElement('input', {type: 'submit', placeholder: 'Post'}))
    );
  }
});
var Comment = React.createClass({
  render: function() {
    return (React.createElement('div', {className: 'comment'},
      React.createElement('h2', {className: 'commentAuthor'}, this.props.author),
      this.props.children)
    );
  }
});