const mongoose = require('mongoose')

const connectDB = async () => {
    try {

        /*version node 2.2.12 */ await mongoose.connect(`mongodb://${process.env.dbUsername}:${process.env.dbPassword}@ac-zvvpr2j-shard-00-00.xpisnnc.mongodb.net:27017,ac-zvvpr2j-shard-00-01.xpisnnc.mongodb.net:27017,ac-zvvpr2j-shard-00-02.xpisnnc.mongodb.net:27017/?ssl=true&replicaSet=atlas-ng8tjr-shard-0&authSource=admin&retryWrites=true&w=majority`, {

       /* version node 4.1 */  //await mongoose.connect(`mongodb+srv://${process.env.dbUsername}:${process.env.dbPassword}@petlooker.xpisnnc.mongodb.net/test?retryWrites=true&w=majority`, {
            
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true,
            useFindAndModify: false
            
        })
        console.log("Database connected")
    } catch (err) {
        console.error(err.message)
        process.exit(1)
    }
}

module.exports = connectDB;