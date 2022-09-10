/*
 * En este archivo se definen los selectores que se utilizarán para extraer
 * la información de la página, se exporta una función que recibe como parámetro un
 * objeto de cheerio y retorna un objeto con la información extraída
 */

const selectorEthereum =
  "#__next > div > div.main-content > div.sc-57oli2-0.comDeo.cmc-body-wrapper > div > div.sc-16r8icm-0.eMxKgr.container > div.n78udj-0.jskEGI > div > div.sc-16r8icm-0.kjciSH.priceSection > div.sc-16r8icm-0.kjciSH.priceTitle > div > span";

export const getInfoEthereum = ($) => {
  const ethereumInfo = {
    text: "Ethereum",
    date: new Date().toLocaleDateString(),
    value: $(selectorEthereum).text() ?? "sin datos",
  };

  return { ethereumInfo };
};
