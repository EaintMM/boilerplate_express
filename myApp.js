require('dotenv').config();
let express = require('express');
let app = express();

// Static asset
app.use("/public", express.static(__dirname + '/public'));

// Root middleware
app.use(function (req, res, next){
    console.log(req.method + " " + req.path + " - " + req.ip);
    next();
});

// HTML file
app.get("/", function (req, res){
    console.log(__dirname);
    res.sendFile(__dirname + "/views/index.html");
});

// Env variable
app.get("/json", function (req, res){
    if (process.env.MESSAGE_STYLE == "uppercase") {
        res.json({"message": "HELLO JSON"});
    } else {
        res.json({"message": "Hello json"});
    }
    
});

// Chain middleware
app.get("/now", function (req, res, next){
    req.time =  new Date().toString();
    next();
}, function (req, res){
    res.send({"time" : req.time});
});

// Route parameters
app.get("/:word/echo", function (req, res){
    //var {word} = req.params;
    res.json({echo: req.params.word});
});

// Qurey parameters
app.get("/name", (req, res) => {
   // console.log(req.query.first);
    //res.json({name: req.query.first + " " + req.query.last});
    res.json({
        name: `${req.query.first} ${req.query.last}`
    }); 
});






































 module.exports = app;
