import React from 'react';

export default function FeedElement(props) {
   return (
    <div className="feed-element-ctr" onClick={props.onClick}>
      <div className="info-ctr">
        <div className="feed-title">{props.title}</div>
        <div className="feed-date">{props.created_at}</div>
      </div>
      <div style={{backgroundImage: "url(" + props.image + ")"}} className='feed-image'/>
    </div>
   )
}
