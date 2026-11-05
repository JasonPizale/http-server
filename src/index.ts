import express, { type Express, type Request, type Response } from "express";
import { handlerReadiness } from "./api/readiness.js";
import { middlewareLogResponses, middlewareMetricsInc } from "./api/middleware.js";
import { handlerMetrics, handlerReset } from "./api/metrics.js";

const app: Express = express();
const port = 8080;

app.get("/api/healthz",handlerReadiness);
app.get("/admin/metrics", handlerMetrics);
app.get("/admin/reset", handlerReset);
app.use("/app", middlewareMetricsInc);
app.use("/app", express.static("./src/app"));
app.use(middlewareLogResponses);

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});