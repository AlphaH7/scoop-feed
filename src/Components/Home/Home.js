import React from 'react';
import axios from 'axios';
import Loader from '../CoreComponents/Loader';
import FeedElement from './FeedElement';
import FeedDetail from './FeedDetail';
import HomeHeader from './HomeHeader';
import Branding from '../Branding/Branding';
import Constants from '../../core-utils/Constants'
import AppHelper from '../../core-utils/AppHelpers'

export default class Home extends React.Component {
  constructor() {
    super()
    this.state = {
      viewState : 0,
      articles : [],
      selectedArticle: null
    }
    this.updateViewState = this.updateViewState.bind(this);
  }

  updateViewState(viewState) {
    this.setState({
      viewState: viewState
    });
  }

  componentDidMount() {
    axios.get(`${Constants.BASE_URL}article?id=&author=Alistier_X`)
      .then(response => {
        this.setState({
          articles: response.data,
          viewState: 1
        });
      });
  }

  selectFeed(selectedFeed , viewState) {
    console.log(selectedFeed);
    this.props.updateViewState(viewState);
    setTimeout(this.setState({
      selectedArticle: selectedFeed
    }), ((0.75 + (this.state.articles.length * 0.05)) * 1000))
  }

  renderFeedData(feedData) {
      return (
        <div className="feed-ctr">
          {
            feedData.map(
              (data , index) => (
                <div style={{transitionDelay: ((0.25 + (0.05 * index)) + "s")}} key={"home-element-2"} className={"feed-category-ctr " + (this.props.viewState === 1 || this.props.viewState === 2 ? "" : "hide")} key={"feed-category-element-" + data.key}>
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
                          <FeedElement onClick={this.selectFeed.bind(this, feedData, 4)} {...feedData} key={"feed-element-" + feedData.id + "-" + data.key}/>
                        )
                      )
                    }
                  </div>
                </div>
              )
            )
          }
          <div className={"feed-detail-ctr " + (this.state.selectedArticle === null ? "hide" : "")}>
            {this.state.selectedArticle === null ? null : <FeedDetail onBackClick={this.selectFeed.bind(this, null, 1)} {...this.state.selectedArticle} />}
          </div>
        </div>
      )
  }

  render() {
    var feedData = AppHelper.groupBy(this.state.articles, function(item){
      return [item.tags];
    }),
    featuredFeed = this.state.articles[Math.floor((Math.random() * (this.state.articles.length - 1)) + 1)];
    return (<div className="home-ctr">
              {
                this.state.viewState === 0 ? (
                  <div className="full-height full-width loading-ctr">
                    <Loader />
                    {"Loading Your Feed"}
                  </div>
                ) : (
                  [ (<Branding key={"home-element-0"}/>),
                    ((this.props.viewState === 1 ||this.props.viewState === 4) ? <HomeHeader ctrCls={this.props.viewState === 4 ? "hide" : ""} key={"home-element-1"} featuredFeed={featuredFeed} /> : null),
                    (this.renderFeedData(feedData))
                  ]
                )
              }
           </div>);
  }


}
