/*
 * En este archivo se agregan las urls de las paginas que se quieren scrapear
 * y la función que extrae la información de la página, dicha función debe recibir
 * como parámetro un objeto de cheerio y retornar un objeto con la información extraída.
 * el objeto de cheerio es el que se obtiene al hacer cheerio.load(html)
 */

import {
  getInfoBank,
  getInfoBitcoin,
  getInfoDogecoin,
  getInfoEthereum,
  getInfoSolana,
} from "../selectors/index.js";

//#region URLs
export const bankData = {
  func: getInfoBank,
  name: "Banco Central",
  url: "https://www.bcentral.cl/",
};

export const solanaData = {
  name: "Solana",
  func: getInfoSolana,
  url: "https://coinmarketcap.com/es/currencies/solana/",
};

export const bitcoinData = {
  name: "Bitcoin",
  func: getInfoBitcoin,
  url: "https://coinmarketcap.com/es/currencies/bitcoin/",
};

export const dogecoinData = {
  name: "Dogecoin",
  func: getInfoDogecoin,
  url: "https://coinmarketcap.com/es/currencies/dogecoin/",
};

export const ethereumData = {
  name: "Ethereum",
  func: getInfoEthereum,
  url: "https://coinmarketcap.com/es/currencies/ethereum/",
};
//#endregion URLs

// Agrega las urls a este arreglo
export const pageList = [
  bankData,
  solanaData,
  bitcoinData,
  dogecoinData,
  ethereumData,
];
