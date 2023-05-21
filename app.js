const express = require('express')
const bodyParser = require('body-parser')
const https = require('https')



const app = express()
app.use(bodyParser.urlencoded({extended:true}))


app.get("/", function(req ,res){
    res.sendFile(__dirname+"/index.html")
})


app.post("/", function(req, res){
    let city = req.body.city

    let country = req.body.country
    const query = city+","+country
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid=86f89ca0c92d492b3fcc702a69195aac&units=metric";
    console.log(url);
    
    https.get(url, function(response){
        console.log(response.statusCode)
        response.on("data", function(data){
            const weatherData = JSON.parse(data)
            const temp = weatherData.main.temp;
            const desc = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;

            res.write("<p>Temperature in"+city+" is "+ temp + " degree celcius</p>")
            res.write("<p> condition: "+ desc+"</p>")
            res.write('<img src="https://openweathermap.org/img/wn/'+icon+'@2x.png" alt="" srcset="">')
            res.send()
        })
    })
})

app.listen(3000, function(){
    console.log("Server started http://localhost:3000/");
})