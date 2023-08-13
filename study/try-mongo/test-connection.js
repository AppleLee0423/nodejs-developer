
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://ld210:Test880423@cluster0.dik9vhw.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
    await client.connect();
    const adminDB = client.db('test').admin(); //admin DB 인스턴스
    const listDatabase = await adminDB.listDatabases(); //데이터베이스 정보 가져오기
    console.log(listDatabase);
    return "OK";
}

run().then(console.log)
    .catch(console.error)
    .finally(() => client.close);
