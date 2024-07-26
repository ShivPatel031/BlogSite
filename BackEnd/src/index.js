import dotenv from "dotenv";
dotenv.config({
    path:'./.env'
})

import {app} from "./app.js";
import { dataBaseConnection } from "./db/database.js";

dataBaseConnection().then(()=>{
    console.log("Database is connected");
})

let port = process.env.PORT || 4000;

app.listen(port,()=>{
    console.log("Port is running on ",port);
})