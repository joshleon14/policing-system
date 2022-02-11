import express from 'express';
import mongoose from 'mongoose'

const app = express();
const port = 3001;
const DBURL = "mongodb://localhost:27017/api";

app.get("/", (req, res) => {
    res.send("Hello API");
});

// creating mongoDB connection
mongoose.connect(DBURL).then(() => {
    console.log("DB Connected")
})

app.listen(port, () => {
    console.log(`API running on ${port}`);
});