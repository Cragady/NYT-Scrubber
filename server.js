const express = require("express"),
    path = require("path"),
    bodyParser = require("body-parser"),
    PORT = process.env.Port || 3001,
    app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

if(process.env.NODE_ENV === "production"){
    app.use(express.static("client/build"));
};

app.get("*", (req, res) =>{
    res.sendFile(path.join(__dirname, "./client/build/index.html"));
});


//app.use(<insert set variable for ORM like file>);
//mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/<insert name of database>");

app.listen(PORT, ()=>{
    console.log(`🙉 ==> Server now listening to you... ON PORT ${PORT}!!`)
});