import path from "path";
import express from "express";
import { createServer as createViteServer } from "vite";
import { createApp } from "./server/app";
import { config } from "./server/config";

async function startServer() {
  const app = createApp();
  const PORT = config.port;

  // Technical SEO endpoints: robots.txt and sitemap.xml
  app.get("/robots.txt", (req, res) => {
    res.type("text/plain");
    const filePath =
      process.env.NODE_ENV === "production"
        ? path.join(process.cwd(), "dist", "robots.txt")
        : path.join(process.cwd(), "public", "robots.txt");
    res.sendFile(filePath);
  });

  app.get("/sitemap.xml", (req, res) => {
    res.type("application/xml");
    const filePath =
      process.env.NODE_ENV === "production"
        ? path.join(process.cwd(), "dist", "sitemap.xml")
        : path.join(process.cwd(), "public", "sitemap.xml");
    res.sendFile(filePath);
  });

  // Integrate Vite for SPA development or static serving in production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[HWS Server] ${config.studio.name} backend running on http://localhost:${PORT}`);
  });
}

startServer();
