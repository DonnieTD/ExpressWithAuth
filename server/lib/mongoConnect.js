
let DBINSTANCE;

const [MongoClient,connectToMongo] = [
    require('mongodb').MongoClient,
    async (successMessage) => {
        await MongoClient.connect(process.env.DBCONNSTRING, { useUnifiedTopology: true }, (err, client) => {
    
            if (err) {
                return console.log(err)
            };
    
            DBINSTANCE = client.db(process.env.DBNAME);
            console.log(successMessage)
        })
    }
];

export {
    connectToMongo,
    DBINSTANCE
}