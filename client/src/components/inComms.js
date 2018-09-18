import React, {Component} from "react";

class InComms extends Component {

    render(){
        return(
            <input className="form-control" {...this.props} />
        );
    };
};

export default InComms;