import React from 'react';
import axios from 'axios';
import Loader from '../CoreComponents/Loader';
import FeedElement from './FeedElement';
import HomeHeader from './HomeHeader';
import Branding from '../Branding/Branding';
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
    }),
    featuredFeed = this.state.articles[Math.floor((Math.random() * (this.state.articles.length - 1)) + 1)];
    console.log(featuredFeed);
    return (<div className="home-ctr">
              {
                this.state.viewState === 0 ? (
                  <div className="full-height full-width loading-ctr">
                    <Loader />
                    {"Loading Your Feed"}
                  </div>
                ) : (
                  [ (<Branding key={"home-element-0"}/>),
                    (this.props.viewState === 1 ? <HomeHeader key={"home-element-1"} featuredFeed={featuredFeed} /> : null),
                    (feedData.map(
                      (data) => (
                        <div key={"home-element-2"} className="feed-category-ctr" key={"feed-category-element-" + data.key}>
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
