import React, { Component } from 'react';
import Carded from "../components/Carded/Carded";
import AnchorTag from "../components/AnchorTag/AnchorTag";

class Saved extends Component {
    constructor(props){
        super(props);
        this.state = {
            saved: []
        };
    };
    componentDidMount(){
        this.savdArtz();
    };
    savdArtz = ()=>{
        this.setState({
            saved: [{_id: "yo", headlineMain: "shtuffs", web_url: "www.google.com"}]
        });
    };
    render(){
        const savvy = this.state.saved.map((x) => 
            <Carded key={x._id} id={x._id} className="card m-2" cardname={x.headlineMain}>
                <AnchorTag href={x.web_url} />
                {/* <InputFields id={"note-" + x._id} placeholder="Write a Note!" /> */}
            </Carded>
        );
        return(
            <div className="Savvy">
                {this.state.saved.length > 0 ? (<Carded cardname="Saved">
                    {savvy}
                </Carded>) : <Carded cardname="Oops">
                    Looks like there's nothing here. Search some articles and save them!
                </Carded>}
            </div>
        );
    }
};

export default Saved;