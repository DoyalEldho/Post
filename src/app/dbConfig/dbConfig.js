import mongoose from "mongoose";

export async function connectDB(params){

    try {
        mongoose.connect(process.env.MONGO_URL)
        const dbConnection = mongoose.connection;

        dbConnection.on('connected',()=>{

            console.log('mongodb connected sucessfully');
            
        })

        dbConnection.on('error',(e)=>{
            console.log('mongodb errror',e);
            
        })
    } catch (error) {
        
        console.log('something went wrong');
        
        console.log(error);
        
    }
}