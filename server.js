//server.js
import fs from "node:fs/promises";
import express from "express";
import dotenv from "dotenv";
dotenv.config();

// Constants
const isProduction = process.env.NODE_ENV === "production";
const port = process.env.PORT || 5173;
const base = process.env.BASE || "/";

// Minhas envs
const newRelicEnvVars = {
  VITE_NR_ACCOUNT_ID: process.env.VITE_NR_ACCOUNT_ID,
  VITE_NR_TRUST_KEY: process.env.VITE_NR_TRUST_KEY,
  VITE_NR_AGENT_ID: process.env.VITE_NR_AGENT_ID,
  VITE_NR_LICENSE_KEY: process.env.VITE_NR_LICENSE_KEY,
  VITE_NR_APPLICATION_ID: process.env.VITE_NR_APPLICATION_ID,
  VITE_NR_BEACON: process.env.VITE_NR_BEACON,
  VITE_NR_ERROR_BEACON: process.env.VITE_NR_ERROR_BEACON,
};
const serializedEnv = JSON.stringify(newRelicEnvVars);

// Cached production assets
const templateHtml = isProduction
  ? await fs.readFile("./dist/client/index.html", "utf-8")
  : "";
const ssrManifest = isProduction
  ? await fs.readFile("./dist/client/ssr-manifest.json", "utf-8")
  : undefined;

// Create http server
const app = express();

// Add Vite or respective production middlewares
let vite;
if (!isProduction) {
  const { createServer } = await import("vite");
  vite = await createServer({
    server: { middlewareMode: true },
    appType: "custom",
    base,
  });
  app.use(vite.middlewares);
} else {
  const compression = (await import("compression")).default;
  const sirv = (await import("sirv")).default;
  app.use(compression());
  app.use(base, sirv("./dist/client", { extensions: [] }));
}

// Serve HTML
app.use("*", async (req, res) => {
  try {
    const url = req.originalUrl.replace(base, "");

    let template;
    let render;
    if (!isProduction) {
      // Always read fresh template in development
      template = await fs.readFile("./index.html", "utf-8");
      template = await vite.transformIndexHtml(url, template);
      render = (await vite.ssrLoadModule("/src/entry-server.tsx")).render;
    } else {
      template = templateHtml;
      render = (await import("./dist/server/entry-server.js")).render;
    }

    const rendered = await render(url, ssrManifest);

    const html = template
      .replace(`<!--app-html-->`, rendered.html ?? "")
      .replace("<!--new-relic-env-->", serializedEnv);

    res.status(200).set({ "Content-Type": "text/html" }).end(html);
  } catch (e) {
    vite?.ssrFixStacktrace(e);
    console.log(e.stack);
    res.status(500).end(e.stack);
  }
});

// Start http server
app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});
