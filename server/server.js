// Toivo Lindholm 2025

import express from "express";
import puppeteer from "puppeteer";
import cors from "cors";

const app = express();

app.use(cors());

app.get("/", async (req, res) => {
    console.log("New server request made");
    const queryValue = req.query.q;
    const searchValue = queryValue.trim().replaceAll(" ", "%20");
    let imagesArr = [];

    //open the browser
    const browser = await puppeteer.launch({
        args:[
            '--start-maximized'
        ]
    });
    //open new page
    const page = await browser.newPage();
    await page.setViewport({width: 1920,height: 1080});
    await page.goto(`https://co.pinterest.com/search/pins/?q=${searchValue}`);
    try {
        await page.waitForSelector(".hCL", {timeout: 3000});
        await page.evaluate(() => {window.scrollBy(0, 150)});
    
        //this query selects only posts
        //and lefts out little icons under the navbar with same class name
        const images = await page.$$(".hCL:not(.N7A)");
        for(const image in images){
            const singleImage = await page.evaluate(element => element.src, images[image]);
            const singleImageHeight = await page.evaluate(element => element.height, images[image]);
            
            //dont take profile images (they have same class name)
            if(singleImageHeight == 32) continue;
            imagesArr.push({src: singleImage, height: singleImageHeight});
        }

        //send json response
        res.json(imagesArr);
        
        //close the browser
        await browser.close();
    } catch(err){
        console.log("Some error occured or cant find anything!");
        res.json(null);
        await browser.close();
    }
});

app.listen(3000);