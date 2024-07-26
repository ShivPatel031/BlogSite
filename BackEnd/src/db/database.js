import mongoose from "mongoose";
import { databaseCollection } from "../constant.js";

export async function dataBaseConnection()
{
    try
    {
        const host = await mongoose.connect(`${process.env.DATABASE_URL}/${databaseCollection}`);
        console.log(`Database is connected to host ${host.connection.host}`);
    }
    catch(error)
    {
        console.log("database connection is giving error");
    }
}