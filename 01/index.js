import { app } from "./app.js";
import connectDB from "./config/db.js";
import { config } from "./config/config.js";

const port = config.port || 3000;
 
function server(){
    app.listen(port,async()=>{
         await connectDB()
        console.log(`server is running at port : ${port}`)
    })
}

 server()