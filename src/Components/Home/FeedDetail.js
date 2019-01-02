import React from 'react';
import AppIcons from '../CoreComponents/AppIcons';

export default function FeedDetail(props) {
   return (
    <div className="feed-detail" onClick={props.onClick}>
      <div style={{backgroundImage: "url(" + props.image + ")"}} className='feed-image'>
        <div className="back-icon-ctr">
          <AppIcons onClick={props.onBackClick} iconCls={"back"}/>
          <div onClick={props.onBackClick}>{"BACK"}</div>
        </div>
      </div>
      <div className="feed-title">{props.title}</div>
      <div className="feed-tag-ctr">
        <div className="feed-tag">{props.tags[0].split("'")[1]}</div>
        <div className="feed-date">{props.created_at}</div>
      </div>
      <div className="feed-description">{props.description}</div>
    </div>
   )
}
