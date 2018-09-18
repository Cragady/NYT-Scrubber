import React, { Component } from 'react';
import TextLay from '../components/SearchForm/TextLay';
import Button from "../components/Button/Button";
import Carded from "../components/Carded";
import AnchorTag from "../components/AnchorTag/AnchorTag";
import Saved from "./Saved";
import moment from "moment";
import API from "../utils/API";

class Home extends Component {
  constructor(props){
    super(props);
    this.state = {
      Topic: "",
      StartYear: "",
      EndYear: "",
      searched: [],
      saved: false
    };
  };

  handleChengezz = (event)=>{
    const { id, value } = event.target;
    if(id === "StartYear"){
      const StartPasser = {id: id, StartYear: value}; 
      this.yearValidation(StartPasser);
    } else if (id === "EndYear"){
      const EndPasser = {id: id, EndYear: value};
      this.yearValidation(EndPasser);
    };
    this.setState({
      [id]: value
    });
  };

  yearValidation = (years)=>{
    const { StartYear, EndYear } = years;
    switch(true) {
      case StartYear > this.state.EndYear && StartYear.length === 4:
        this.setState({
          EndYear: StartYear
        })
        break;
      case EndYear < this.state.StartYear && EndYear.length === 4:
        this.setState({
          StartYear: EndYear
        })
        break;
      default: 
        break;
    };
  };

  idPassInheritance = arg =>{
    const argPass = arg.replace(/\s/g, '');
    return argPass;
  }

  printThings = event => {
    event.preventDefault();
    const {aid, headlinemain, published, link} = event.target.dataset;
    API.saveArt({
      _id: aid,
      headline: headlinemain,
      link: link,
      date: published
    })
      .then(res => {
        console.log("Saved!");
        if(this.state.saved === true){
          this.setState({
            saved: false
          });
        } else {
          this.setState({
            saved: true
          });
        }
      })
      .catch(err => console.log(err));
  };

  getArts = (event)=>{
    event.preventDefault();
    API.searchArtics(this.state).then(result =>{
      const searchArr = result.data.response.docs.slice(0, 5).map( x=>
        <Carded key={x._id} id={"r-" + x._id} className="card m-2" published={moment(x.pub_date).format("MMMM Do YYYY, h:mm a")}cardname={x.headline.main}>
            <AnchorTag className="a-cust" href={x.web_url} />
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
      })
    });
  }

  render() {
    const topHeads = ["Topic", "Start Year", "End Year"];
    const divees = topHeads.map((x) =>
      <TextLay 
        key={x}
        onChange={this.handleChengezz}
        headName={x}
        value={this.state[this.idPassInheritance(x)]}
        onClick={this.thisFunk}
      />
    );
    return (

        <div className="Page">

            <Carded cardname="Search">
                <div>
                    Search articles from 1851 to the present year!
                </div>
                <hr />
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

            <Saved savved={this.state.saved}/>

      </div>
    );
  };
};

export default Home;
