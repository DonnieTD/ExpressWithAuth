const MongoClient = require('mongodb').MongoClient

var DBINSTANCE;

async function connectToMongo(successMessage,dbName) {
    await MongoClient.connect(process.env.DBCONNSTRING, { useUnifiedTopology: true }, (err, client) => {

        if (err) {
            return console.log(err)
        };

     try{
        const db = client.db(dbName);       

        db.collection('Users').insertOne({
            UserName: "admin", 
            Password: "$2a$10$6CQq/M9yQLKCJ4aKqVMLaeOqZ2uA4cq5q4n15T2d6tArdIdYpf5qO"
        });
     }catch(e){
         console.log(e)
     }
    })
}

[].forEach(x => connectToMongo('RAN INIT DB OPERATION: '+x,x));

connectToMongo('RAN INIT DB OPERATIONS',process.env.DBNAMEPROD);