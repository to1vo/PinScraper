// Toivo Lindholm 2025

import express from "express";
import puppeteer from "puppeteer";
import cors from "cors";
import Session from "./session.js"

const app = express();
app.use(cors({
        origin: "http://localhost:5173",
        credentials: true
}));
app.use(express.json());

const sessions = [];

const getNewSessionId = () => {
    return sessions.length;
}

const loadMore = async (req, res) => {
    console.log("Request for more images!");

    const queryValue = req.query.q;
    const searchValue = queryValue.trim().replaceAll(" ", "%20");

    const loadedImages = [];
    scrollAmount += 300;

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
        await page.waitForSelector(".hCL", {timeout: 1500});
        await page.evaluate(scrollY => window.scrollBy(0, scrollY), scrollAmount);
    
        //this query selects only posts
        //and lefts out little icons under the navbar with same class name
        const images = await page.$$(".hCL:not(.N7A)");
        for(const image in images){
            const imageSrc = await page.evaluate(element => element.src, images[image]);
            const imageHeight = await page.evaluate(element => element.height, images[image]);
            
            //dont take profile images (they have same class name)
            if(imageHeight == 32) continue;
            
            //skip images that were loaded last time :D
            if(sessionLoadedImages.filter(img => img.src === imageSrc).length > 0) continue;

            loadedImages.push({src: imageSrc, height: imageHeight});
        }

        //update the loaded images and scroll amount
        sessionLoadedImages = [...loadedImages, ...imagesArr];

        //send json response
        res.json(loadedImages);
        
        //close the browser
        await browser.close();
    } catch(err){
        console.log("Error occured or cant find anything!");
        res.json(null);
        await browser.close();
    }
}

const initialLoad = async (req, res) => {
    console.log("New search request!");

    const queryValue = req.query.q;
    const searchValue = queryValue.trim().replaceAll(" ", "%20");
    
    //Start new session   
    sessions.push(new Session(getNewSessionId(), searchValue));
    const currentSession = sessions[sessions.length-1];
    
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
        await page.waitForSelector(".hCL", {timeout: 1500});
        await page.evaluate((scrollY) => { 
            window.scrollBy(0, scrollY);
        }, currentSession.scroll);
    
        //this query selects only posts
        //and lefts out little icons under the navbar with same class name
        const images = await page.$$(".hCL:not(.N7A)");
        for(const image in images){
            const imageSrc = await page.evaluate(element => element.src, images[image]);
            const imageHeight = await page.evaluate(element => element.height, images[image]);
            
            //dont take profile images (they have same class name)
            if(imageHeight == 32) continue;
            currentSession.addImage({src: imageSrc, height: imageHeight});
        }

        //update the scroll amount
        currentSession.update();

        //send json response
        res.json({sessionId: currentSession.id, images: currentSession.loadedImages});
        
        //close the browser
        await browser.close();

    } catch(err){
        console.error(err);
        console.log("Error occured or cant find anything!");
        res.json(null);
        await browser.close();
    }
}

const closeSession = (req, res) => {
    const body = req.body;
    console.log("CLOSING SESSION WITH ID ", body.sessionId);
    console.log(sessions);
    sessions.splice(body.sessionId, 1);
    console.log(sessions);
    res.json({message: "Session closed"});
}

app.get("/", initialLoad);

app.get("/more", loadMore);

app.post("/session", closeSession);

app.listen(3000, () => {
    console.log("Server listening on port 3000");
});