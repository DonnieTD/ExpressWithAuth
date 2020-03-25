const MongoClient = require('mongodb').MongoClient

var DBINSTANCE;

async function connectToMongo(uri,dbName,successMessage){
    await MongoClient.connect(uri, {useUnifiedTopology: true},(err, client) => {

        if (err) {
            return console.log(err)
        };
        
        DBINSTANCE = client.db(dbName);
        
        console.log(successMessage)
    })
}

export{
    connectToMongo,
    DBINSTANCE
}