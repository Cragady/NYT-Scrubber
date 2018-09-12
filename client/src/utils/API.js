import axios from "axios";
const nyArty = process.env.REACT_APP_NYT_KYU;

export default {
    searchArtics: (urlPass) =>{
        const {Topic, StartYear, EndYear} = urlPass;
        console.log(urlPass);
        return (axios.get(`https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=${nyArty}&q=${Topic}&begin_date=${StartYear}0101&end_date=${EndYear}1231`));
    }
};