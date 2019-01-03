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
      selectedArticle: null,
      featuredFeed: null
    }
    this.updateViewState = this.updateViewState.bind(this);
  }

  updateViewState(viewState) {
    this.setState({
      viewState: viewState
    });
  }

  componentDidMount() {
    axios.get(`${Constants.BASE_URL}?id=&author=Alistier_X`)
      .then(response => {
        var featuredFeed = response.data[Math.floor((Math.random() * (response.data.length - 1)) + 1)];
        this.setState({
          articles: response.data,
          viewState: 1,
          featuredFeed: featuredFeed
        }, this.updateLikedItemList);
      });
  }

  selectFeed(selectedFeed , viewState) {
    this.props.updateViewState(viewState);
    setTimeout(this.setState({
      selectedArticle: selectedFeed
    }), ((1 + (this.state.articles.length * 0.05)) * 1000))
  }

  onLike(feed, ev) {
    console.log(ev, feed)
    ev.stopPropagation();
    console.log(feed);
    var likedItems = JSON.parse(localStorage.getItem("likedItems"));
    if(likedItems.includes(feed.id)){
      var index = likedItems.indexOf(feed.id);
      likedItems.splice(index, 1);
    }else{
      likedItems.push(feed.id);
    }
    console.log(likedItems);
    localStorage.setItem('likedItems', JSON.stringify(likedItems));
    this.updateLikedItemList();
  }

  updateLikedItemList() {
    var items = this.state.articles;
    var likedItems = JSON.parse(localStorage.getItem("likedItems"));
    items.forEach((data)=> {
        data["liked"] = likedItems.indexOf(data.id) !== -1 ? true : false;
    });
    this.setState({
      articles: items
    });
  }

  renderFeedData(feedData) {
      var feedNodes = [];

      feedData.forEach(
          (data , index) => {
            var filteredFeedData = data.value.filter((info)=>(
              this.props.viewState === 2 ? info.liked : true
            ));
            if(this.props.viewState === 1 || (this.props.viewState === 2 && filteredFeedData.length !== 0)){
              feedNodes.push( <div style={{transitionDelay: ((0.25 + (0.05 * index)) + "s")}} key={"home-element-2"} className={"feed-category-ctr " + (this.props.viewState === 1 || this.props.viewState === 2 ? "" : "hide")} key={"feed-category-element-" + data.key}>
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
                            filteredFeedData.map(
                              (feedData) => (
                                <FeedElement onLike={this.onLike.bind(this, feedData)} onClick={this.selectFeed.bind(this, feedData, 4)} {...feedData} key={"feed-element-" + feedData.id + "-" + data.key}/>
                              )
                            )
                          }
                        </div>
                      </div>
                    )
                }
            }
        );

          console.log(feedNodes);

      return (
        <div className="feed-ctr" key="feed-listing">
          {feedNodes.length === 0
            ? (<div className="empty-view-ctr">
                  
                  <div>{"No Feeds to Display"}</div>
                </div>)
            : feedNodes}
          <div className={"feed-detail-ctr " + (this.state.selectedArticle === null ? "hide" : "")}>
            {this.state.selectedArticle === null ? null : <FeedDetail onLike={this.onLike.bind(this, this.state.selectedArticle)} onBackClick={this.selectFeed.bind(this, null, 1)} {...this.state.selectedArticle} />}
          </div>
        </div>
      )
  }

  render() {
    var feedData = AppHelper.groupBy(this.state.articles, function(item){
      return [item.tags];
    });

    feedData.sort((a,b)=> a.key.localeCompare(b.key));

    return (<div className="home-ctr">
              {
                this.state.viewState === 0 ? (
                  <div className="full-height full-width loading-ctr">
                    <Branding key={"home-element-0"}/>
                    <Loader />
                    {"Loading Your Feed"}
                  </div>
                ) : (
                  [ (<Branding key={"home-element-0"}/>),
                    ((this.props.viewState === 1 ||this.props.viewState === 4) ? <HomeHeader onClick={this.selectFeed.bind(this, this.state.featuredFeed, 4)} ctrCls={this.props.viewState === 4 ? "hide" : ""} key={"home-element-1"} featuredFeed={this.state.featuredFeed} /> : null),
                    (this.renderFeedData(feedData))
                  ]
                )
              }
           </div>);
  }


}
