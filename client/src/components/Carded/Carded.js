import React from "react";

export const Carded = props => (
    <section className="card mt-3 col-8 mx-auto">
        <h2 className="card-header">
            {props.cardName}
        </h2>
        {props.children}
    </section>
);

export default Carded;