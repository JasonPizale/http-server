import { type Request, type Response, type NextFunction } from "express";
import { config } from "../config.js";

export const middlewareLogResponses = (req: Request, res: Response, next: NextFunction): void => {
    res.on("finish", () => {
        if (res.statusCode !== 200) {
            console.log(`[NON-OK] ${req.method} ${req.url} - Status: ${res.statusCode}`);
        }
    });
    next();
}; 

export async function middlewareMetricsInc(req: Request, res: Response, next: NextFunction) {
    config.fileserverHits++;
    next();
}