import React from "react";

export const Button = props => (
    // <button className={"btn btn-default col-4 m-2 " + props.classExt} {...props}>
    <button className={
            props.classext ? 
            ("btn btn-default col-4 m-2 " + props.classext) : 
            ("btn btn-default col-4 m-2")} 
            {...props}>
                {props.children}
    </button>
);

export default Button;