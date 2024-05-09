
import { config } from "./src/config/config.js";
import { CONNECT_DB } from "./src/config/db.js";
import {app} from "./src/app.js"

const port = config.PORT || 3000;

CONNECT_DB();
app.listen(port, () => {
  console.log(`server is listening on port: ${port}`);
});
