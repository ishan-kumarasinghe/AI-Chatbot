import app from "./app.js";
import { connetToDatabase } from "./db/connection.js";
const port = process.env.PORT || 5000;
connetToDatabase().then(() => {
    app.listen(port, () => console.log("Server Open & Connected to Database."));
}).catch((err) => console.log(err));
//# sourceMappingURL=index.js.map