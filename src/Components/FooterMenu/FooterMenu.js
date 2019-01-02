import React from 'react';
import PropTypes from 'prop-types';
import AppIcons from '../CoreComponents/AppIcons';


export default function FooterMenu(props) {
    var tabs = [
      {
        id: 1,
        tabName: "Home",
        tabIcon: "home"
      },
      {
        id: 2,
        tabName: "My favorites",
        tabIcon: "heart"
      },
      {
        id: 3,
        tabName: "Home",
        tabIcon: "add"
      }
    ]
    return (
      <div className={"foot-wrapper " + (props.viewState === 4 ? "hide" : "")}>
        {
          tabs.map((data) => (
              <div className="tab-ctr" key={"tab-" + data.id} onClick={props.updateViewState.bind(this, data.id)}>
                <AppIcons iconCls={data.tabIcon}/>
              </div>
            )
          )
        }
      </div>
    )
}

FooterMenu.propTypes = {
    viewState: PropTypes.number.isRequired,
    updateViewState: PropTypes.func.isRequired
}
