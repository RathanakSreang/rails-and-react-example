// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require react
//= require react_ujs
//= require components
//= require_tree .
$(document).ready(function(){
  $('.btn').click(function(e){
    ReactDOM.render(
    <CommentBox />, document.getElementById('content')
    );
    e.preventDefault();
  });
  ReactDOM.render(React.createElement(HelloMessage, {name: "Rathanak"}), document.getElementById('id_name'));
  ReactDOM.render(<Timer />, document.getElementById('id_time'));
  // ReactDOM.render(React.createElement(CommentBox, null,{}), document.getElementById('content'))
  ReactDOM.render(<CommentBox url="/api/comments" pollInterval={2000} />, 
    document.getElementById('content'));
});