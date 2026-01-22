import mongoose from "mongoose";
import {DB_NAME} from '../constant.js'

const connectDB = async () => {
    try {
        const uri = process.env.MONGODB_URI;
        if(!uri) {
            console.log("Can't get DB URI");
            process.exit(1);
        }
        
        const connectionInstance = mongoose.connect(`${uri}/${DB_NAME}`);

        console.log(`Database Connected !! Host name : ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log(`Database connection Failed !! Error : ${error}`);
        process.exit(1);
    }
}

export default connectDB;