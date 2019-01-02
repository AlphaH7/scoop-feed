import React from 'react';
import FooterMenu from './FooterMenu/FooterMenu';
import Home from './Home/Home';
import '../sass/main.scss';

export default class App extends React.Component {
  constructor() {
    super()
    this.state = {
      viewState : 1
    }
    this.updateViewState = this.updateViewState.bind(this);
  }

  renderUI() {
      var ui = null;
      switch(this.state.viewState) {
                  case 2:
                      ui = (<Home viewState={this.state.viewState}/>);
                      break;
                  default:
                      ui = (<Home viewState={this.state.viewState}/>);
     }
     return ui;
  }

  updateViewState(viewState) {
    console.log(viewState);
    this.setState({
      viewState: viewState
    });
  }

  render() {
    return (<div className="app-view" key={1}>
              {this.renderUI()}
              <FooterMenu viewState={this.state.viewState}
                          updateViewState={this.updateViewState}/>
           </div>);
  }


}
