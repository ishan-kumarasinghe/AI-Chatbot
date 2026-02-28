// Here we use mongoose to handle database connection
import { connect, disconnect } from "mongoose";

async function connetToDatabase() {
    try {
        await connect(process.env.MONGODB_URL);
    } catch (error) {
        console.log(error);
        throw new Error("Can't connect to MongoDB.");
    }
}

async function disconnectFromDatabase() {
    try {
        await disconnect();
    } catch (error) {
        console.log(error);
        throw new Error("Could not disconnect form MonogoDB."); 
    }
}

export { connetToDatabase, disconnectFromDatabase};