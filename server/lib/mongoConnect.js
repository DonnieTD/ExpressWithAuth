const MongoClient = require('mongodb').MongoClient

var DBINSTANCE;

async function connectToMongo(successMessage) {
    await MongoClient.connect(process.env.DBCONNSTRING, { useUnifiedTopology: true }, (err, client) => {

        if (err) {
            return console.log(err)
        };

        if(process.env.ENV == "PROD"){
            DBINSTANCE = client.db(process.env.DBNAMEPROD);
        }else if(process.env.ENV == "QA"){
            DBINSTANCE = client.db(process.env.DBNAMEQA);
        }else{
            DBINSTANCE = client.db(process.env.DBNAMEDEV);
        }
    })
}

export {
    connectToMongo,
    DBINSTANCE
}