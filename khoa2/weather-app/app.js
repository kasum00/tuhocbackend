
//command js cho moi may deu dung duoc
const asyncRequest = require("async-request");

const getWeather = async (location)=>{
    const access_key ="9480220fb3e2c6c8d77a7c7f8146b4c3";
    const url = `https://api.weatherstack.com/current?access_key=${access_key}&query=${location}`;
    //call api
    try {
        const res = await asyncRequest(url);
        const data = JSON.parse(res.body);//chuyen ve thanh object 
        const weather={
        region : data.location.region,
        country : data.location.country,

        temperature: data.current.temperature,
        wind_speed : data.current.wind_speed,
        precip: data.current.precip,
        cloudcover: data.current.cloudcover,
        };
        console.log(weather);
        return weather;
    } catch (error) {
        console.log("error");
        return {
            isSuccess: false,
            error,
        };
    };
    
};
//getWeather("vietnam");

const express = require("express");
const app=express();
const path = require('path');
app.set("view engine", "hbs");
const pathPublic = path.join(__dirname,"./public");
app.use(express.static(pathPublic));

//khi truy cap trag web no se chay cai ham nay
app.get("/",async(req,res)=>{
    const params = req.query;
    //console.log(params);
    const location = params.address;
    const weather = await getWeather(location);
    console.log(weather);
    if(location){        
        res.render("weather",{
        status: true,
        region: weather.region,
        country : weather.country,
        temperature: weather.temperature,
        wind_speed : weather.wind_speed,
        precip: weather.precip,
        cloudcover: weather.cloudcover,
        });
    }
    else{
        res.render("weather",{
            status: false,
        });
    }  
});

//hien thi ra cho nguoi dung xem



const port = 7000;

app.listen(7000,()=>{
    console.log(`app run on http://localhost:${port}`);
});