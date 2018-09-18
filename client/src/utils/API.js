import axios from "axios";
const nyArty = process.env.REACT_APP_NYT_KYU;

export default {
    searchArtics: (urlPass) =>{
        const {Topic, StartYear, EndYear} = urlPass;
        let startPass = StartYear;
        let endPass = EndYear;
        const ranCheck = /^\d{0,4}$/;
        if(!(StartYear.match(ranCheck))){
            startPass = 9999
        };
        if(!(EndYear.match(ranCheck))){
            endPass = 1;
        };
        if((startPass > (new Date()).getFullYear()) || (startPass === "")){
            startPass = (new Date()).getFullYear();
        } else if (startPass < 1851){
            startPass = 1851;
        };
        if((endPass < startPass) || (endPass === "")){
            endPass = startPass;
        } else if(endPass > (new Date()).getFullYear()){
            endPass = (new Date()).getFullYear();
        };
        return (axios.get(`https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=${nyArty}&q=${Topic}&begin_date=${startPass}0101&end_date=${endPass}1231`));
    },

    getArts: function(){
        return axios.get("/api/arti");
    },

    getArt: function(id){
        return axios.get("/api/arti/" + id);
    },

    deleteArt: function(id){
        return axios.delete("/api/arti/" + id);
    },

    saveArt: function(artData){
        return axios.post("/api/arti", artData);
    },

    upArt: function(id, artData){
        return axios.put(("/api/arti/" + id), artData);
    },

    getComms: function(){
        return axios.get("/api/comm");
    },
    
    saveComm: function(commData){
        return axios.post("/api/comm", commData);
    },

    deleteComm: function(commId){
        return axios.delete("/api/comm/" + commId);
    }
};