import express from "express";
import 'dotenv/config'
import v1 from "./src/api_V1/v1.js";
import cookieParser from "cookie-parser";
import cors from "cors"

const app = express();
// const port =3000;
const port = process.env.PORT || 4000;
const corsOptions = {
  origin: 'http://localhost:5173', 
  methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
//This line is here to handle cors issues
app.use('/api/v1', v1);

app.use((req,res)=>{
    res.status(404).json({
        message:'Path does not exist'
    })
})
app.use((err, req, res, next) => {
  console.error(err.stack);

  res.status(500).json({
    status: "error",
    message: err.message || "Internal Server Error",
  });
});
app.listen(port, () => {
    console.log('App is Listening to Port ' + port);

})

