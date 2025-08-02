# Pinterest-search app

Node.js(express, puppeteer, cors), React(JavaScript, HTLM, CSS)

[Pinterest](https://fi.pinterest.com/) "webscrape" sovellus, jossa käyttäjä voi hakea kuvia pinterestistä ja ne tulevat näkyviin sivulle. 
Ohjelmassa on siis server.js tiedosto, joka pyörii toisella terminaalilla, se hakee pyynnöstä [puppeteerin](https://pptr.dev/) avulla pinterestistä käyttäjän antamalla hakusanalla kuvien lähteet ja palauttaa ne, jonka jälkeen kuvat tulevat käyttäjälle näkyviin.

## Ominaisuudet
- Käyttäjä voi hakea sivun hakutoiminolla pinterestistä kuvia
- Sivulle tulee noin 25 ensimmäistä kuvaa
- Lisäksi ohjelmassa on
    - pinterest tyylinen dynaaminen layout
    - sekä muita samankaltaisuuksia
    - virheiden tarkastus
    - lataus ja virhe ilmoitukset

## Jatkokehitys
- voisi hakea myös kuvien mahdolliset otsikot/descriptionit
