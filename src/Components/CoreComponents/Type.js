import React from 'react';
import TypeIt from 'typeit';

export default class Type extends React.Component {
  constructor (props) {
    super(props);
  }

  componentDidMount () {
    new TypeIt(this.el, this.props);
  }

  render(){
  	return <span className={this.props.ctrCls} ref={(el) => { this.el = el; }}>{this.props.children}</span>;
  }
}
