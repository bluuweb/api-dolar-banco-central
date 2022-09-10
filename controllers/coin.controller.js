import { useCoinHook } from "../hooks/useCoin.hook.js";

export const bitcoin = async (_, res) => {
    try {
        const { getInfoBitcoin } = useCoinHook();

        res.json(await getInfoBitcoin());
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const dolar = async (_, res) => {
    try {
        const { getInfoDolar } = useCoinHook();

        res.json(await getInfoDolar());
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const uf = async (_, res) => {
    try {
        const { getInfoUf } = useCoinHook();

        res.json(await getInfoUf());
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const all = async (_, res) => {
    try {
        const { getInfoBitcoin, getInfoUf, getInfoDolar } = useCoinHook();
        const response = await Promise.allSettled([
            getInfoBitcoin(),
            getInfoUf(),
            getInfoDolar(),
        ]);

        const arrayCoin = response.map((coin) => {
            if (coin.status === "fulfilled") {
                return coin.value;
            } else {
                return coin.reason;
            }
        });

        res.json(arrayCoin);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
};
