import React from 'react';
import axios from 'axios';
import Constants from '../../core-utils/Constants'
import Branding from '../Branding/Branding';

export default class AddFeed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      tags: "",
      imageURL: "",
      addingFeed: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(key , event) {
    var newState = {};
    newState[key] = event.target.value;
    this.setState(newState);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({
      addingFeed: true
    });
    var me = this;
    axios.post(`${Constants.BASE_URL}`,
      {
        author: "Alistier_X",
        description: this.state.description,
        image: this.state.imageURL,
        tags: this.state.tags.split(",").map(
          (data) => ("['" + data + "']")
        ),
        published: "true",
        title: this.state.title
      })
      .then(function(response){
        me.props.updateViewState(1);
      });
  }

  render() {
    return (
      <div className="add-feed-ctr">
        <Branding/>
        <div className="feed-heading">{"ADD FEED"}</div>
        <form className="form-ctr" onSubmit={this.handleSubmit}>
          <div className="input-ctr">
              <input disabled={this.state.addingFeed} placeHolder='Title' value={this.state.title} onChange={this.handleChange.bind(null, "title")} />
          </div>
          <div className="input-ctr">
              <textarea disabled={this.state.addingFeed} rows={10} placeHolder='Description' value={this.state.description} onChange={this.handleChange.bind(null, "description")} />
          </div>
          <div className="input-ctr">
              <input disabled={this.state.addingFeed} placeHolder='Tags' value={this.state.tags} onChange={this.handleChange.bind(null, "tags")} />
          </div>
          <div className="input-ctr">
              <input disabled={this.state.addingFeed} placeHolder='Image URL (Only)' value={this.state.imageURL} onChange={this.handleChange.bind(null, "imageURL")} />
          </div>
          <input disabled={this.state.addingFeed} className="app-button" type="submit" value={!this.state.addingFeed ? "Add Feed" : "Adding Feed"} />
        </form>
      </div>
    );
  }
}
