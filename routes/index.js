/*
 * El endpoint principal de la API / retornara la info de todas las monedas

 * La idea es que cada moneda tenga su propio endpoint
 * y que el endpoint de la moneda sea el nombre de la moneda en minúsculas
 * Ejemplo: /bitcoin
 * Ejemplo: /ethereum
*/

import axios from "axios";
import * as cheerio from "cheerio";
import { Router } from "express";
import { pageList, solanaData } from "../URLs/index.js";

const router = Router();

// TODO: Agregar los endpoints faltantes

// Endpoint para obtener los datos de solana
router.get("/solana", async (_, res) => {
  try {
    const { data } = await axios.get(solanaData.url);
    const $ = cheerio.load(data);

    // Desestructuramos el objeto que retornan todas las funciones
    const { solanaInfo } = solanaData.func($);

    res.json(solanaInfo);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

// Endpoint para obtener los datos de todas las monedas
router.get("/", async (_, res) => {
  let infoValues = {};

  // Obtiene el arreglo de promesas que se le pasara a Promise.allSettled
  const requests = pageList.map(({ url }) => axios.get(url));

  // Espera a que todas las peticiones se resuelvan
  const responseList = await Promise.allSettled(requests);

  // Recorre todas las respuestas
  responseList.forEach((response, index) => {
    // si la respuesta es exitosa
    if (response.status === "fulfilled") {
      const html = response.value.data; // obtiene el html de la respuesta
      const $ = cheerio.load(html); // carga el html en cheerio

      // obtiene la info de la página
      const info = pageList[index].func($); // Mandamos cheerio a la función que extrae la información

      infoValues = { ...infoValues, ...info }; // agrega la información a la respuesta
    }

    // Si la respuesta es rechazada, sigue teniendo la misma estructura que la respuesta exitosa
    // pero el valor de es un mensaje de error
    else {
      infoValues = {
        ...infoValues,
        [`${pageList[index].name}Info`]: {
          text: pageList[index].name,
          value: "Error al obtener datos",
          date: new Date().toLocaleDateString(),
        },
      };
    }
  });

  res.json(infoValues);
});

export default router;
