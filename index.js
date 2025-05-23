const express = require("express");
const cors = require("cors");
const request = require("request");

const app = express();
app.use(cors());

app.get("/proxy", (req, res) => {
  const videoUrl = req.query.url;
  if (!videoUrl) return res.status(400).send("Missing URL");

  console.log("Proxying:", videoUrl);

  request
    .get(videoUrl)
    .on("error", (err) => {
      console.error("Request Error:", err);
      res.status(500).send("Proxy failed.");
    })
    .pipe(res);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Proxy running on port ${port}`);
});
