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

    //Selain auki
    const browser = await puppeteer.launch({
        args:[
            '--start-maximized'
        ]
    });
    //Avataan uusi sivu
    const page = await browser.newPage();
    await page.setViewport({width: 1920,height: 1080});
    await page.goto(`https://co.pinterest.com/search/pins/?q=${searchValue}`);
    try {
        await page.waitForSelector(".hCL", {timeout: 5000});
        await page.evaluate(() => {window.scrollBy(0, 150)});
    
        const images = await page.$$(".hCL");
        for(const image in images){
            const singleImage = await page.evaluate(element => element.src, images[image]);
            const singleImageHeight = await page.evaluate(element => element.height, images[image]);
            imagesArr.push({src: singleImage, height: singleImageHeight});
        }
        //Lähetetään json response
        res.json(imagesArr);
        
        //Suljetaan selain
        await browser.close();

    } catch(err){
        console.log("cant find anything!");
        res.json(null);
        await browser.close();
    }
});

app.listen(3000);