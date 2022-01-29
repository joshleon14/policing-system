const express = require('express');
const app = express();
const port = 3001

app.get("/", (req, res) => {
    res.send("Hello API");
});

app.listen(port, () => {
    console.log(`API running on ${port}`);
});