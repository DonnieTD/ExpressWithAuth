
let DBINSTANCE;

const MongoClient = require('mongodb').MongoClient

const connectToMongo = async (successMessage) => {
    await MongoClient.connect(process.env.DBCONNSTRING, { useUnifiedTopology: true }, (err, client) => {

        if (err) {
            return console.log(err)
        };

        DBINSTANCE = client.db(process.env.DBNAME);
        console.log(successMessage)
    })
}

export {
    connectToMongo,
    DBINSTANCE
}