import React from "react";

export const Carded = props => (
    <section className="card mt-3 col-8 mx-auto" {...props}>
        {props.id ? (<div className="card-header">
            {props.cardName}
        </div>) : (
            <h2 className="card-header">
                {props.cardName}
            </h2>
        )}
        {props.children}
    </section>
);

export default Carded;