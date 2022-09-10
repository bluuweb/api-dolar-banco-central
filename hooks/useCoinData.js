import axios from "axios";
import * as cheerio from "cheerio";
import { bitcoin, dolar, euro, uf } from "../data/coin.data.js";

export const useCoinData = () => {
    const date = new Date().toLocaleDateString();

    const getDolarInfo = async () => {
        const { name, selector, url } = dolar;
        let valor;
        try {
            const { data } = await axios.get(url);
            const $ = cheerio.load(data);
            valor = $(selector).text().split("/")[0].trim() ?? "sin datos";
        } catch (error) {
            console.log(error);
            valor = "Error al solicitar los datos";
        } finally {
            return {
                name,
                url,
                date,
                valor,
            };
        }
    };

    const getUFInfo = async () => {
        const { name, selector, url } = uf;
        let valor;
        try {
            const { data } = await axios.get(url);
            const $ = cheerio.load(data);
            valor = $(selector).text() ?? "sin datos";
        } catch (error) {
            console.log(error);
            valor = "Error al solicitar los datos";
        } finally {
            return {
                name,
                url,
                date,
                valor,
            };
        }
    };

    const getEuroInfo = async () => {
        const { name, selector, url } = euro;
        let valor;
        try {
            const { data } = await axios.get(url);
            const $ = cheerio.load(data);
            valor = $(selector).text() ?? "sin datos";
        } catch (error) {
            console.log(error);
            valor = "Error al solicitar los datos";
        } finally {
            return {
                name,
                url,
                date,
                valor,
            };
        }
    };

    const getBitcoinInfo = async () => {
        const { name, selector, url } = bitcoin;
        let valor;
        try {
            const { data } = await axios.get(url);
            const $ = cheerio.load(data);
            valor = $(selector).text() ?? "sin datos";
        } catch (error) {
            console.log(error);
            valor = "Error al solicitar los datos";
        } finally {
            return {
                name,
                url,
                date,
                valor,
            };
        }
    };

    return {
        getDolarInfo,
        getUFInfo,
        getEuroInfo,
        getBitcoinInfo,
    };
};
