import React from "react";

export const Button = props => (
    <button className="btn btn-default" {...props}>
        {props.children}
    </button>
);

export default Button;