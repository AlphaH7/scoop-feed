import React from 'react';
import FooterMenu from './FooterMenu/FooterMenu';
import Home from './Home/Home';
import AddFeed from './AddFeed/AddFeed';
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
                      ui = (<Home updateViewState={this.updateViewState} viewState={this.state.viewState}/>);
                      break;
                  case 3:
                      ui = (<AddFeed updateViewState={this.updateViewState} viewState={this.state.viewState}/>);
                      break;
                  default:
                      ui = (<Home updateViewState={this.updateViewState} viewState={this.state.viewState}/>);
     }
     return ui;
  }

  componentDidMount() {
    console.log(localStorage.getItem("likedItems"));
    if(localStorage.getItem("likedItems") === null){
      localStorage.setItem('likedItems', '[]');
    }
  }

  updateViewState(viewState) {
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
