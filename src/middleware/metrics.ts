import client from "prom-client";
import { Request, Response, NextFunction } from "express";

const register = new client.Registry();

client.collectDefaultMetrics({ register });

const httpRequestDurationMicroseconds = new client.Histogram({
  name: "http_request_duration_seconds",
  help: "Duration of HTTP requests in seconds",
  labelNames: ["method", "route", "status_code"],
  buckets: [0.1, 0.3, 0.5, 1, 1.5, 2, 5],
});

register.registerMetric(httpRequestDurationMicroseconds);

export function metricsMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const start = process.hrtime();

  res.on("finish", () => {
    const delta = process.hrtime(start);
    const durationInSeconds = delta[0] + delta[1] / 1e9;

    httpRequestDurationMicroseconds
      .labels(req.method, req.route?.path || req.path, String(res.statusCode))
      .observe(durationInSeconds);
  });

  next();
}

export function metricsEndpoint(req: Request, res: Response) {
  res.set("Content-Type", register.contentType);
  register.metrics().then((metrics) => res.end(metrics));
}
