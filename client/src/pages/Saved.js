import React, { Component } from 'react';
import Carded from "../components/Carded";
import Button from "../components/Button/Button";
import AnchorTag from "../components/AnchorTag/AnchorTag";
import InputFields from "../components/SearchForm/InputFields";
import InComms from "../components/inComms";
import moment from "moment";
import API from "../utils/API";

class Saved extends Component {
    constructor(props){
        super(props);
        this.state = {
            saved: [],
            comment: "",
            artiid: ""
        };
    };
    componentDidMount(){
        this.loadArts();
    };

    componentDidUpdate(prevProps){
        if(this.props.savved !== prevProps.savved){
            this.loadArts();
        };
    };

    commentWright = (event)=>{
        const {artiid} = event.target.dataset;
        this.setState({
            comment: event.target.value,
            artiid: artiid
        });
    };

    commentUnWright = (event)=>{
        const {id} = event.target;
        API.deleteComm(id)
            .then(res =>{
                this.loadArts();
            });
    };

    commSub = (event)=>{
        event.preventDefault();
        if(this.state.comment === ""){
            return;
        };
        API.saveComm({
            comment: this.state.comment,
            article: this.state.artiid
        }).then(resComm =>{
            API.upArt(resComm.data.article, resComm.data)
                .then(
                    this.setState({
                        comment: "",
                        artiid: ""
                    })
                );
            this.loadArts();
        })
    };

    destroyArts = id =>{
        API.deleteArt(id)
            .then(res =>{
                API.deleteManyComm(res.data.idPass)
                    .then(delRes =>{
                        this.loadArts();
                    });
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
                        {x.comment ? (x.comment.map(commented=>
                            <div key={commented._id}> {commented.comment} 
                            <button key={"b-" + commented._id} id={commented._id} onClick={this.commentUnWright}>Delete</button>
                            </div>
                            
                        )) : null}
                        <InputFields 
                            onChange={this.commentWright} 
                            data-artiid={x._id} 
                            placeholder="Enter your comment"
                            classext="px-3 bg-light" />
                        <Button classext="btn btn-success mx-auto" children="Comment" onClick={this.commSub} />
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
                saved: savvy,
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