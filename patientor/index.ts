import express from "express";

const app = express();

app.get("/api/ping", (_req, resp) => {
  return resp.send("pong");
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server up on http://localhost:${PORT}`);
});
