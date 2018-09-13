import React from 'react';

export const AnchorTag = props => (
    <a href={props.href} target="_blank">
        {props.children ? (props.children) : "Link"}
    </a>
);

export default AnchorTag;