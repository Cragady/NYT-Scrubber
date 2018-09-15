const express = require("express"),
    path = require("path"),
    bodyParser = require("body-parser"),
    PORT = process.env.Port || 3001,
    routes = require("./routes"),
    mongoose = require("mongoose"),
    app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

if(process.env.NODE_ENV === "production"){
    app.use(express.static("client/build"));
};

app.use(routes);

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/nytreact");

app.get("*", (req, res) =>{
    res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.listen(PORT, ()=>{
    console.log(`🙉 ==> Server now listening to you... ON PORT ${PORT}!!`)
});