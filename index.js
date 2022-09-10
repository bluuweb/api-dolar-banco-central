import express from "express";
import axios from "axios";
import * as cheerio from "cheerio";
import cors from "cors";
const app = express();

app.get("/:coin", cors(), async (req, res) => {
    console.log("Parametros: " + req.params.coin);
    try {

        // Esto se me acaba de ocurrir para mejorar y filtrar por tipo de moneda.
        const coinName =  req.params.coin

        // La idea la voy a ir describiendo por pasos, y al final veremos las conclusiones:

        // 1 - Crear la lista de "scrapeos" por llamarlos de alguna forma, esto podría crearse en otro método, en otro fichero, tal vez que lo recuperara de una
        //     base de datos de scrapeos o algo así.

        const scrapers = [
            {
                title: "dollar",
                promiseUrl : "https://www.bcentral.cl/inicio",
                axiospromise: axios.get("https://www.bcentral.cl/inicio"),
                selector: "#_BcentralIndicadoresViewer_INSTANCE_pLcePZ0Eybi8_myTooltipDelegate > div > div > div.fin-indicators-col1 > div > div > div:nth-child(3) > div > p.basic-text.fs-2.f-opensans-bold.text-center.c-blue-nb-2"
            },
            {
                title: "UF",
                promiseUrl : "https://www.bcentral.cl/inicio",
                axiospromise: axios.get("https://www.bcentral.cl/inicio"),
                selector: "#_BcentralIndicadoresViewer_INSTANCE_pLcePZ0Eybi8_myTooltipDelegate > div > div > div.fin-indicators-col1 > div > div > div:nth-child(1) > div > p.basic-text.fs-2.f-opensans-bold.text-center.c-blue-nb-2"
            },
            {
                title: "euro",
                promiseUrl : "https://www.bcentral.cl/inicio",
                axiospromise: axios.get("https://www.bcentral.cl/inicio"),
                selector: "#_BcentralIndicadoresViewer_INSTANCE_pLcePZ0Eybi8_myTooltipDelegate > div > div > div.fin-indicators-col1 > div > div > div:nth-child(4) > div > p.basic-text.fs-2.f-opensans-bold.text-center.c-blue-nb-2"
            },
            {
                title: "bitcoin",
                promiseUrl : "https://coinmarketcap.com/es/currencies/bitcoin/",
                axiospromise: axios.get("https://coinmarketcap.com/es/currencies/bitcoin/"),
                selector: "#__next > div > div.main-content > div.sc-57oli2-0.comDeo.cmc-body-wrapper > div > div.sc-16r8icm-0.eMxKgr.container > div.n78udj-0.jskEGI > div > div.sc-16r8icm-0.kjciSH.priceSection > div.sc-16r8icm-0.kjciSH.priceTitle > div > span"
            },
        ];

        // console.log(scrapers);

        // 1.5 - Filtrar los scrappers dependiendo de la entrada.

        let scrapersFiltered = [];
        if (coinName.toUpperCase() == "ALL") {
            scrapersFiltered = scrapers;
        } else {
            scrapersFiltered = scrapers.filter( item => item.title.toUpperCase() == coinName.toUpperCase() )
        }

        // 2 - Recuperar el array de promesas para poder lanzarlas todas juntas, en principio doy por supuesto que habrá tantos resultados como promesas, tanto
        //     si fallar como van bien.

        const promisesList = scrapersFiltered.map( (item) => { 
            return item.axiospromise;
        } );

        // console.log("promisesList: " + promisesList);

        // 3 - Lanzar todas las promesas juntas con el Promise.allSettled, entiendo que el proceso terminará con la petición que más tarde, habiendo completado todas.

        const resultPromises = await Promise.allSettled(promisesList);

        // console.log("resultPromises " + resultPromises)

        // 4 - Recorreremos los resultados de las promesas, la premisa es que debe haber tantos resultados como "scrapers", que son los mismos que las promesas que se han
        //     lanzado, y además (esto es muy importante) deben estar en el mismo orden en que se han lanzado.
        //     Para cada resultado, haremos el scrapping con cheerio y lo montamos en un objeto que es lo que retornaremos.

        const resultScraping = resultPromises.map( (result, index) => {
            // console.log("result.status : " + result.status)
            if (result.status == "fulfilled") {
                const $ = cheerio.load(result.value.data);
                const scrappValue = $(scrapers[index].selector).text().split("/")[0].trim();
                return {
                    text: scrapers[index].title,
                    valor: scrappValue,
                    fecha: new Date().toLocaleDateString()
                }
            } else {
                return {
                    text: scrapers[index].title,
                    valor: "",
                    fecha: new Date().toLocaleDateString()
                }
            }
        })

        // console.log("resultScraping : " + resultScraping)

        // 5 - Filtramos los resultados para solo devolver los que tienen "valor". (Esto es, según se mire, opcional, ya que el cliente se podría hacer "algo" para
        //     cuando un "text" tiene un valor inconsistente. Tal vez poner un icono "interrogante" o no se)

        const filteredResult = resultScraping.filter(item => item.valor != "")

        // console.log("filteredResult : " + filteredResult)

        return res.json(filteredResult);

        // Conclusiones:
        // - Para añadir un nuevo scrapeo, solo hay que añadir un nuevo elemento a los "scrapers"
        // - Tener en cuenta que el valor scrapeado va a tener que tener en cuenta los splits, trim o replaces que haya que hacer. Ahora mismo esto es IGUAL para todos los
        //   valores scrapeados (mirar "resultPromises.map" para comprender lo que quiero decir). Se podría llevar a un método a parte que recibiera el "result" y el 
        //   "scrapers[i]" para tratarlo de una forma especial, aunque en mi opinión diría que todos los scrapeos van a mantener la misma operación sobre "text()", tal 
        //   vez algún split o replace pero que le va a venir bien a cualquier valor que se scrapee. No obstante es una desventaja.
        // - He filtrado los resultados con valor vacio ... pero podría no filtrarse y que en cliente se hiciera algo, no se, pintar el ROJO el "text" o poner un 
        //   icono de "?" ... ideas varias.
        // - He puesto console.log por todos los pasos, si los activais podreis ir viendo los resultados en caso de que no comprendais algún paso (yo creo que no
        //   he hecho nada especialmente raro, pero por si acaso.)

    } catch (error) {
        console.log("Error : " + error)
        res.json({ error });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("server en ⭐ Puerto:" + PORT));
