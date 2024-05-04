import { app } from "./src/app.js";
import { config } from "./src/config/config.js";
import connectDB from "./src/config/db.js";


const port = config.port || 3000
const startServer = async ()=>{
    await connectDB()
    app.listen(port,()=>{
        console.log(`server is running successfully at port : ${port}`);
    })
}

startServer()