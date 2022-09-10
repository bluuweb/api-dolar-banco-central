/*
 * En este archivo se definen los selectores que se utilizarán para extraer
 * la información de la página, se exporta una función que recibe como parámetro un
 * objeto de cheerio y retorna un objeto con la información extraída
 */

//#region Selectores
const selectorDollar =
  "#_BcentralIndicadoresViewer_INSTANCE_pLcePZ0Eybi8_myTooltipDelegate > div > div > div.fin-indicators-col1 > div > div > div:nth-child(3) > div > p.basic-text.fs-2.f-opensans-bold.text-center.c-blue-nb-2";

const selectorUF =
  "#_BcentralIndicadoresViewer_INSTANCE_pLcePZ0Eybi8_myTooltipDelegate > div > div > div.fin-indicators-col1 > div > div > div:nth-child(1) > div > p.basic-text.fs-2.f-opensans-bold.text-center.c-blue-nb-2";

const selectorEuro =
  "#_BcentralIndicadoresViewer_INSTANCE_pLcePZ0Eybi8_myTooltipDelegate > div > div > div.fin-indicators-col1 > div > div > div:nth-child(4) > div > p.basic-text.fs-2.f-opensans-bold.text-center.c-blue-nb-2";
//#endregion Selectores

export const getInfoBank = ($) => {
  const dollarInfo = {
    text: "Dollar",
    date: new Date().toLocaleDateString(),
    value: $(selectorDollar).text().split("/")[0].trim() ?? "sin datos",
  };

  const ufInfo = {
    text: "UF",
    date: new Date().toLocaleDateString(),
    value: $(selectorUF).text() ?? "sin datos",
  };

  const euroInfo = {
    text: "Euro",
    date: new Date().toLocaleDateString(),
    value: $(selectorEuro).text() ?? "sin datos",
  };

  return { dollarInfo, ufInfo, euroInfo };
};
