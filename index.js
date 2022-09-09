import express from "express";
import axios from "axios";
import * as cheerio from "cheerio";
import cors from "cors";
const app = express();

app.get("/", cors(), async (req, res) => {
    console.log("entró aquí cors");
    try {
        // const { data } = await axios.get("https://www.bcentral.cl/inicio");
        // const dataBitcoin = await axios.get("https://es.investing.com/crypto/bitcoin/btc-usd")

        const [dataBC, dataBitcoin] = await Promise.allSettled([
            axios.get("https://www.bcentral.cl/inicio"),
            axios.get("https://coinmarketcap.com/es/currencies/bitcoin/"),
        ]);

        // if (dataBC.status === "rejected") throw ({ msg: dataBC.reason });

        let $ = cheerio.load(dataBC.value.data);
        const selectorDolar =
            "#_BcentralIndicadoresViewer_INSTANCE_pLcePZ0Eybi8_myTooltipDelegate > div > div > div.fin-indicators-col1 > div > div > div:nth-child(3) > div > p.basic-text.fs-2.f-opensans-bold.text-center.c-blue-nb-2";

        const selectorUF =
            "#_BcentralIndicadoresViewer_INSTANCE_pLcePZ0Eybi8_myTooltipDelegate > div > div > div.fin-indicators-col1 > div > div > div:nth-child(1) > div > p.basic-text.fs-2.f-opensans-bold.text-center.c-blue-nb-2";

        const selectorEuro =
            "#_BcentralIndicadoresViewer_INSTANCE_pLcePZ0Eybi8_myTooltipDelegate > div > div > div.fin-indicators-col1 > div > div > div:nth-child(4) > div > p.basic-text.fs-2.f-opensans-bold.text-center.c-blue-nb-2";

        const objetoDolar = {
            text: "dolar",
            valor: $(selectorDolar).text().split("/")[0].trim() ?? "sin datos",
            fecha: new Date().toLocaleDateString(),
        };

        const objetoUF = {
            text: "UF",
            valor: $(selectorUF).text() ?? "sin datos",
            fecha: new Date().toLocaleDateString(),
        };

        const objetoEuro = {
            text: "Euro",
            valor: $(selectorEuro).text() ?? "sin datos",
            fecha: new Date().toLocaleDateString(),
        };

        // bitcoin

        $ = cheerio.load(dataBitcoin.value.data);
        const selectorBitcoin =
            "#__next > div > div.main-content > div.sc-57oli2-0.comDeo.cmc-body-wrapper > div > div.sc-16r8icm-0.eMxKgr.container > div.n78udj-0.jskEGI > div > div.sc-16r8icm-0.kjciSH.priceSection > div.sc-16r8icm-0.kjciSH.priceTitle > div > span";

        // console.log(dataBitcoin.value);

        const objetoBitcoin = {
            text: "Bitcoin",
            valor: $(selectorBitcoin).text() ?? "sin datos",
            fecha: new Date().toLocaleDateString(),
        };

        return res.json([objetoDolar, objetoUF, objetoEuro, objetoBitcoin]);
    } catch (error) {
        res.json({ error });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("server en ⭐ Puerto:" + PORT));
