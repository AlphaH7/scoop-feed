import React from 'react';
import PropTypes from 'prop-types';

export default function HomeHeader(props) {
   console.log(props);
   return (
        <div className="highlights-ctr">
        <div className="category-bg"/>
        <div style={{backgroundImage: "url(" + props.featuredFeed.image + ")"}} className="featured-banner-ctr">
         <div className="featured-overlay">
             <div className="feed-title">{props.featuredFeed.title}</div>
             <div className="feed-description">{props.featuredFeed.description}</div>
           </div>
          </div>
        </div>
   )
}

HomeHeader.propTypes = {
    featuredFeed: PropTypes.object.isRequired
}
