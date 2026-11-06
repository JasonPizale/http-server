import { type Request, type Response } from "express";

export function handlerValidateChirp(req: Request, res: Response) {
    type parameters = {
        body: string;
    };

    const params: parameters = req.body;
    const chirp = params.body;

    if (typeof chirp !== "string") {
        res.status(400).json({
            error: "Something went wrong"
        });
        return;
    }

    if (chirp.length > 140) {
        res.status(400).json({
            error: "Chirp is too long"
        });
        return;
    }

    const profaneWords = ["kerfuffle", "sharbert", "fornax"];
    const words = chirp.split(" ");

    const cleanedWords = words.map((word) => {
        if (profaneWords.includes(word.toLowerCase())) {
            return "****";
        } else {
            return word;
        }
    });

    const cleanedBody = cleanedWords.join(" ");

    res.status(200).json({
        cleanedBody: cleanedBody
    });
}