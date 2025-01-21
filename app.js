import express from "express";
import 'dotenv/config'
import v1 from "./src/api_V1/v1.js";
import cookieParser from "cookie-parser";
import cors from "cors"

const app = express();
const port = process.env.PORT || 4000;

app.use(cookieParser());
app.use(express.json());
app.use(cors({ origin: 'http://localhost:5173/', credentials: true }))

app.use('/api/v1', v1)
app.listen(port, () => {
    console.log('App is Listening to Port ' + port);

})

