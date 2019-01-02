import React from 'react';
import axios from 'axios';
import Loader from '../CoreComponents/Loader';
import FeedElement from './FeedElement';
import Constants from '../../core-utils/Constants'
import AppHelper from '../../core-utils/AppHelpers'

export default class Home extends React.Component {
  constructor() {
    super()
    this.state = {
      viewState : 0,
      articles : []
    }
    this.updateViewState = this.updateViewState.bind(this);
  }

  updateViewState(viewState) {
    console.log(viewState);
    this.setState({
      viewState: viewState
    });
  }

  componentDidMount() {
    axios.get(`${Constants.BASE_URL}article?id=&author=Alistier_X`)
      .then(response => {
        console.log(response.data);
        this.setState({
          articles: response.data,
          viewState: 1
        });
      });
  }

  render() {
    var feedData = AppHelper.groupBy(this.state.articles, function(item){
      return [item.tags];
    });
    console.log(this.state.articles[Math.floor(Math.random() * (this.state.articles.length + 1))] , Math.floor(Math.random() * (this.state.articles.length + 1)));
    return (<div className="home-ctr">
              {
                this.state.viewState === 0 ? (
                  <div className="full-height full-width loading-ctr">
                    <Loader />
                    {"Loading Your Feed"}
                  </div>
                ) : (
                  [
                    (<div className="highlights-ctr">
                      <div className="category-bg"/>
                    </div>),
                    (feedData.map(
                      (data) => (
                        <div className="feed-category-ctr" key={"feed-category-element-" + data.key}>
                          <div className="category-bg">
                            <div>{"•"}</div>
                            <div>{"•"}</div>
                            <div>{"•"}</div>
                          </div>
                          <div className="category-name-ctr">
                            <div className="category-name">{data.key.split("'")[1]}</div>
                          </div>
                          <div className="feed-list-ctr">
                            {
                              data.value.map(
                                (feedData) => (
                                  <FeedElement {...feedData} key={"feed-element-" + feedData.id + "-" + data.key}/>
                                )
                              )
                            }
                          </div>
                        </div>
                      )
                    ))
                  ]
                )
              }
           </div>);
  }


}
