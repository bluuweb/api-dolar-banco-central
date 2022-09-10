import axios from "axios";
import * as cheerio from "cheerio";
import { bitcoin, dolar, uf } from "../data/coins.data.js";

export const useCoinHook = () => {
    const date = new Date().toLocaleDateString();

    const getInfoBitcoin = async () => {
        const { url, selector, name } = bitcoin;
        let value;
        try {
            const { data } = await axios.get(url);
            const $ = cheerio.load(data);
            value = $(selector).text() ?? "sin datos";
        } catch (error) {
            console.log(error.response?.status);
            value = error.message;
        } finally {
            return {
                date,
                name,
                url,
                value,
            };
        }
    };

    const getInfoDolar = async () => {
        const { url, selector, name } = dolar;
        let value;
        try {
            const { data } = await axios.get(url);
            const $ = cheerio.load(data);
            value = $(selector).text().split("/")[0].trim() ?? "sin datos";
        } catch (error) {
            console.log(error.response?.status);
            value = error.message;
        } finally {
            return {
                date,
                name,
                url,
                value,
            };
        }
    };

    const getInfoUf = async() => {
        const { url, selector, name } = uf;
        let value;
        try {
            const { data } = await axios.get(url);
            const $ = cheerio.load(data);
            value = $(selector).text() ?? "sin datos";
        } catch (error) {
            console.log(error.response?.status);
            value = error.message;
        } finally {
            return {
                date,
                name,
                url,
                value,
            };
        }
    }

    return {
        getInfoBitcoin,
        getInfoDolar,
        getInfoUf
    };
};
