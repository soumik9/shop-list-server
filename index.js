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

        // api get all servicces
        app.get('/services', async (req, res) => {
            const query = req.query;
            const category = req.query.category;
            const area = req.query.area;
            const status = req.query.status;
            let convertStatus = true;

            if(status === 'true'){ convertStatus = true }else{ convertStatus = false }


            let filter = {};

            if(category){
                filter = {category: category};
            }
            if(area){
                filter = {area: area};
            }
            if(status){
                filter = {status: convertStatus};
            }
            if(category && area){
                filter = {category: category, area: area};
            }
            if(category && status){
                filter = {category: category, status: convertStatus};
            }
            if(area && status){
                filter = {area: area, status: convertStatus};
            }
            
            if(category && area && status){
                filter = {category: category, area: area, status: convertStatus};
            }
 

            let services;

            if(category || area || status){
                services = await servicesCollection.find(filter).toArray();
            }else{
                services = await servicesCollection.find({}).toArray();
            }

            res.send(services);
        })

   
        
        } finally {

    }
}

run().catch(console.dir);

// port listening
app.listen(port, () => {
    console.log('Listening to port, ', port);
})