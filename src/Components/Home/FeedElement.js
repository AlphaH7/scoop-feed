import React from 'react';
import Moment from 'moment';
import AppIcons from '../CoreComponents/AppIcons';

export default function FeedElement(props) {
   return (
    <div className="feed-element-ctr" onClick={props.onClick}>
      <div className="info-ctr">
        <div className="feed-title">{props.title}</div>
        <div className="feed-date">{Moment(props.created_at, "YYYYMMDD").fromNow()}</div>
        <div className="feed-description">{props.description}</div>
      </div>
      <div className="like-icon-ctr" onClick={props.onLike}>
        <AppIcons iconCls={props.liked ? "active-heart" : "heart"} />
      </div>
      <div style={{backgroundImage: "url(" + props.image + ")"}} className='feed-image'/>
    </div>
   )
}
