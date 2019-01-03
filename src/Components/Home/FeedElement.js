import React from 'react';
import Moment from 'moment';

export default function FeedElement(props) {
   return (
    <div className="feed-element-ctr" onClick={props.onClick}>
      <div className="info-ctr">
        <div className="feed-title">{props.title}</div>
        <div className="feed-date">{Moment(props.created_at, "YYYYMMDD").fromNow()}</div>
        <div className="feed-description">{props.description}</div>
      </div>
      <div style={{backgroundImage: "url(" + props.image + ")"}} className='feed-image'/>
    </div>
   )
}
