const express = require("express");
const https = require("https");
const bodyparser = require("body-parser");
const app = express();
app.use(bodyparser.urlencoded({extended:true}));

app.get("/",function(req,res){
    res.sendFile( __dirname + "/index.html");
})

app.post("/",function(req,res){
    const cityName = req.body.city;
    const city = cityName;
    const unit = "metric";
    const key = "8512fe79c75d1071bf5ca59a35117cba";

    const url = "https://api.openweathermap.org/data/2.5/weather?q="+ city +"&units="+ unit +"&appid="+ key +"";
    https.get(url,function(response){
        console.log(response.statusCode);

        response.on("data",function(data){
            const weatherdata = JSON.parse(data);
            const temp = weatherdata.main.temp;
            const icon = weatherdata.weather[0].icon;
            const image = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
            const description = weatherdata.weather[0].description;
            res.write("<h1>Temprature of " + city + " city is : " + temp + " degree Celcius</h1>");
            res.write("<h3> Description - " + description + "</h3>");
            res.write("<img src = " + image + ">");
            res.send();
        })
        
    });
})

app.listen("3000",function(){
    console.log("server stared");
})