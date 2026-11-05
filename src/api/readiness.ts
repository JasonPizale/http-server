import { type Request, type Response } from "express";

export const handlerReadiness = async (req: Request, res: Response): Promise<void> => {
   res.set("Content-Type", "text/plain; charset=utf-8");
   res.send("OK");
};
