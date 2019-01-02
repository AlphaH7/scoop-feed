import React from 'react';
import PropTypes from 'prop-types';

import Icons from'../../../src/img/icons.svg';

export default function AppIcons(props) {
    return (
        <svg onClick={props.onClick} className={props.iconCls + "-app-icon app-icon " + props.ctrCls  }
            height="1em" width="1em">
            <use xlinkHref={Icons + "#icon-" + props.iconCls}></use>
        </svg>
    )
}

AppIcons.propTypes = {
    iconCls: PropTypes.string.isRequired
}
