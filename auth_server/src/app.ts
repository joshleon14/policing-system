import { AuthRouter } from './routes/index.js';
import express from 'express';

const app = express();
const port = 3000;

// Default Middleware for support for JSON
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Routers for handling Requests
app.use("/", AuthRouter);



app.listen(port, () => {
    console.log(`Auth Server Running on port ${port}`);
})