import express from "express";
import 'dotenv/config'
import v1 from "./src/api_V1/v1.js";
const app = express();
const port=process.env.PORT||4000;

app.use(express.json());

app.use('/api/v1',v1)
app.listen(port,()=>{
    console.log('App is Listening to Port '+port);
    
})

