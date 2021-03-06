import React from 'react';

export default class AppButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div className="app-button" onClick={this.props.onClick}>
        {this.props.buttonText}
      </div>
    );
  }
}
