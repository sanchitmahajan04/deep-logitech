const express = require('express'); 
const app = express();              
const port = 5000;  

const cheerio = require("cheerio");

let stories;

const getRawData = (URL) => {
   return fetch(URL)
      .then((response) => response.text())
      .then((data) => {
         return data;
      });
};

const URL = "https://time.com/";

const scrapeData = async () => {
   const rawData = await getRawData(URL);

   const parsedData = cheerio.load(rawData);

   stories = parsedData("body > main > section.homepage-section-v2.voices-ls > div.partial.latest-stories > ul")[0].children;

}

scrapeData();

app.get('/', (req, res) => {        
    res.send(stories); 
});

app.listen(port, () => {            
    console.log(`Now listening on port ${port}`); 
});