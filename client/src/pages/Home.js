import React, { Component } from 'react';
import TextLay from '../components/SearchForm/TextLay';
import Button from "../components/Button/Button";
import Carded from "../components/Carded/Carded";
import AnchorTag from "../components/AnchorTag/AnchorTag";
import Saved from "./Saved";
import moment from "moment";
import API from "../utils/API";

class Home extends Component {
  constructor(props){
    super(props);
    this.state = {
      Topic: "",
      StartYear: "2018",
      EndYear: "2018",
      searched: [],
      saved: []
    };
  };

  handleChengezz = (event)=>{
    const { id, value } = event.target;
    this.setState({
      [id]: value
    });
  };

  printThings = event => {
    event.preventDefault();
    const {aid, headlinemain, published, link, comment} = event.target.dataset;
    let commPass;
    if(comment){
      commPass = comment;
    } else {
      commPass = "";
    };
    API.saveArt({
      _id: aid,
      headline: headlinemain,
      link: link,
      comment: commPass,
      date: published
    })
      .then(res => console.log("Saved!"))
      .catch(err => console.log(err));
  };

  getArts = (event)=>{
    event.preventDefault();
    API.searchArtics(this.state).then(result =>{
      const searchArr = result.data.response.docs.slice(0, 5).map( x=>
        <Carded key={x._id} className="card m-2" cardname={x.headline.main}>
            <div>Published: {moment(x.pub_date).format("MMMM Do YYYY, h:mm a")}</div>
            <AnchorTag href={x.web_url} />
            <Button classext="btn-success mx-auto" children="Save" 
              attribsext={{
                "data-aid": x._id,
                "data-headlinemain": x.headline.main,
                "data-published": x.pub_date,
                "data-link": x.web_url
              }}
            onClick={this.printThings} />
        </Carded>
      );
      this.setState({
        searched: searchArr
      });
    });
  }

  render() {
    const topHeads = ["Topic", "Start Year", "End Year"];
    const divees = topHeads.map((x) =>
      <TextLay 
        key={x}
        onChange={this.handleChengezz}
        headName={x}
        onClick={this.thisFunk}
      />
    );
    return (

        <div className="Page">

            <Carded cardname="Search">
                {divees}
                <div>
                    <Button onClick={this.getArts}>
                        Search
                    </Button>
                </div>
            </Carded>

            {this.state.searched.length > 0 ? (<Carded cardname="Results">
                {this.state.searched}
            </Carded>) : null}

            <Saved />

      </div>
    );
  };
};

export default Home;
