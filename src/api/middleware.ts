import { type Request, type Response, type NextFunction } from "express";
import { config } from "../config.js";
import { BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError } from "./errors.js";

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

export function middlewareErrorHandler(
    err: Error, req: Request, res: Response, next: NextFunction
) {
    console.log(`[ERROR] ${req.method} ${req.url} - Error: ${err.message}`);

    if (err instanceof BadRequestError) {
        res.status(400).json({ error: err.message });
    } else if (err instanceof UnauthorizedError) {
        res.status(401).json({ error: err.message });
    } else if (err instanceof ForbiddenError) {
        res.status(403).json({ error: err.message });
    } else if (err instanceof NotFoundError) {
        res.status(404).json({ error: err.message });
    } else {
        res.status(500).json({ error: "Internal Server Error" });
    }
}