const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;
 
//middleware
app.use(cors());
app.use(express.json());

//mongodb connect
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@tech-moto.cy4t9.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
    
        // connect to mongodb collection
        await client.connect();
        const servicesCollection = client.db("shop-list").collection("services");
        const categoriesCollection = client.db("shop-list").collection("categories");

        // api homepage
        app.get('/', (req, res) => {
            res.send('Shop list server is ready.')
        })

     
        
        } finally {

    }
}

run().catch(console.dir);

// port listening
app.listen(port, () => {
    console.log('Listening to port, ', port);
})