import { useCoinData } from "../hooks/useCoinData.js";

export const dolar = async (_, res) => {
    try {
        const { getDolarInfo } = useCoinData();
        return res.json(await getDolarInfo());
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: error.message });
    }
};

export const uf = async (_, res) => {
    try {
        const { getUFInfo } = useCoinData();
        return res.json(await getUFInfo());
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: error.message });
    }
};

export const euro = async (_, res) => {
    try {
        const { getEuroInfo } = useCoinData();
        return res.json(await getEuroInfo());
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: error.message });
    }
};

export const bitcoin = async (_, res) => {
    try {
        const { getBitcoinInfo } = useCoinData();
        return res.json(await getBitcoinInfo());
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: error.message });
    }
};

export const all = async (req, res) => {
    try {
        const { getDolarInfo, getEuroInfo, getUFInfo, getBitcoinInfo } =
            useCoinData();
        // const respuestaDolar = await getDolarInfo()
        // const respuestaEuro = await getEuroInfo()

        const responses = await Promise.allSettled([
            getDolarInfo(),
            getEuroInfo(),
            getUFInfo(),
            getBitcoinInfo(),
        ]);

        return res.json(
            responses.map((data) => {
                if (data.status === "fulfilled") {
                    return data.value;
                }
                return data.reason;
            })
        );
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: error.message });
    }
};
