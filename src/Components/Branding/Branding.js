import React from 'react';
import Type from '../CoreComponents/Type';


export default function FooterMenu(props) {
  document.addEventListener('sticky-change', e => {
    const header = e.detail.target;  // header became sticky or stopped sticking.
    const sticking = e.detail.stuck; // true when header is sticky.
    header.classList.toggle('shadow', sticking); // add drop shadow when sticking.

    document.querySelector('.branding-header-ctr').textContent = header.textContent;
  });
    return (
        <div className="branding-header-ctr">
         <div className="brand">{"Scoop"}</div>
         <Type
           ctrCls="typerwriter-effect"
           strings={["News","Sports","Automobile","Travel","FEED"]}
           loop={false}
           cursor={false}
           lifeLike={false}
           nextStringDelay={2000}
           breakLines={false}
           speed={100}
         />
        </div>
    )
}
