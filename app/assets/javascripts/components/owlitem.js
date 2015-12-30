var Item = React.createClass({
  render: function(){
    return(React.createElement('img', {id: this.props.data.url, src: this.props.data.url}));
  }
});

var OwlItems = React.createClass({
  getInitialState: function(){
    console.log("getInitialState");
    return{ items: []
    }
  },
  loadImageFromServer: function(){
    console.log("loadImageFromServer");
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function(data) {
        console.log("Ajax top");
        this.setState({items: data});
        console.log("Ajax bottom");
      }.bind(this),
      error: function(xhr, status, err){
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  componentWillMount: function() {
    console.log("componentWillMount");
    this.loadImageFromServer();
  },
  componentDidUpdate: function() {
    console.log("componentDidUpdate");
    if(this.isMounted){
      $(ReactDOM.findDOMNode(this)).owlCarousel({
        items: 4,
        autoPlay: 3000
      });
      console.log('did Mount')
    }
  },
  render: function(){
      console.log("render" + this.state.items);
    var arrayItems = this.state.items.map(function(data){
      return React.createElement(Item, {key: data.id, data: data});
    });
    return (React.createElement('div',{id: 'react-owl-demo', className: 'owl-carousel'},
      arrayItems)
    );
  }
});