import React, { Component } from 'react';
import Carded from "../components/Carded/Carded";
import Button from "../components/Button/Button";
import AnchorTag from "../components/AnchorTag/AnchorTag";
import moment from "moment";
import API from "../utils/API";

class Saved extends Component {
    constructor(props){
        super(props);
        this.state = {
            saved: []
        };
    };
    componentDidMount(){
        this.loadArts();
    };

    destroyArts = id =>{
        API.deleteArt(id)
            .then(res =>{
                this.loadArts();
            })
            .catch(err => console.log(err));
    };
     
    loadArts = ()=>{
        API.getArts()
        .then(res =>{
            const savvy = [];
            res.data.map((x) => 
                savvy.push(
                    <Carded key={x._id} id={x._id} className="card m-2" cardname={x.headline}>
                        <div>Published: {moment(x.date).format("MMMM Do YYYY, h:mm a")}</div>
                        <AnchorTag href={x.link} />
                        <Button classext="btn-danger mx-auto" children="Delete" 
                            attribsext={{
                                "data-aid": x._id,
                                "data-headlinemain": x.headline,
                                "data-published": x.date,
                                "data-link": x.link
                            }} 
                        onClick={() => this.destroyArts(x._id)} />
                    </Carded>
                )
            );
            this.setState({
                saved: savvy
            });
        });
    };
    render(){
        return(
            <div className="Savvy">
                {this.state.saved.length > 0 ? (<Carded cardname="Saved">
                    {this.state.saved}
                </Carded>) : (<Carded cardname="Oops">
                    Looks like there's nothing here. Search some articles and save them!
                </Carded>)}
            </div>
        );
    }
};

export default Saved;