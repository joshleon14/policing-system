import express from 'express';
import mongoose from 'mongoose';

import { DepartmentRouter, StationRouter, RankRouter } from './routes';

const app = express();
const port = 3001;
const DBURL = "mongodb://localhost:27017/api";


// Default Middleware for support for JSON
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use("/department", DepartmentRouter);
app.use("/station", StationRouter);
app.use("/rank", RankRouter);

// creating mongoDB connection
mongoose.connect(DBURL).then(() => {
    console.log("DB Connected")
})

app.listen(port, () => {
    console.log(`API running on ${port}`);
});