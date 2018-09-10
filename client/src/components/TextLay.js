import React from 'react';

import InputFields from "./InputFields";
import Button from "./Button";

export const TextLay = props => {
    return(
        <section>
            <h5>{props.headName}</h5>
            <InputFields 
                onChange={props.onChange} 
                placeholder={props.headName} 
            />
        </section>
    );
};

export default TextLay;