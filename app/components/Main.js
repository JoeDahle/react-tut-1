var React = require('react');

var Main = React.createClass({
  render: function(){
    return (
      <div>
        Hello new World
        {this.props.children}
      </div>
    )
  }
});

module.exports = Main;
