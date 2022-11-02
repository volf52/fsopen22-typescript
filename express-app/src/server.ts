import express from "express";

const app = express();

app.get("/hello", (_, resp) => {
  resp.send("Hello Full Stack!");
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
