import express from "express";
import 'dotenv/config'
import v1 from "./src/api_V1/v1.js";
import cookieParser from "cookie-parser";
import cors from "cors"

const app = express();
// const port =3000;
const port = process.env.PORT || 4000;
app.use(cors({ credentials: true, origin: 'http://localhost:5173' }));
app.use(cookieParser());
app.use(express.json());
//This line is here to handle cors issues
app.use('/api/v1', v1)
app.listen(port, () => {
    console.log('App is Listening to Port ' + port);

})

