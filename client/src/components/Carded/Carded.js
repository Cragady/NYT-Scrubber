import React from "react";
import "./Carded.css";

export const Carded = props => (
    <section className="card mt-3 col-8 mx-auto" {...props}>
        {props.id ? (<div className="card-header">
            {props.cardname}
        </div>) : (
            <h2 className="card-header">
                {props.cardname}
            </h2>
        )}
        {props.children}
    </section>
);

export default Carded;