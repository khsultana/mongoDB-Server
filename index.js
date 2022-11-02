const express = require('express')
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('API Is Running');
})


// userid:dbUser1
//pass: tn8V9sw1liHhpohV

const uri = "mongodb+srv://dbUser1:tn8V9sw1liHhpohV@cluster0.r5kyl42.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {

    try {
        const userCollecton = client.db('MOngo').collection('users');
        app.get('/users', async (req, res) => {
            const query = {};
            const cursor = userCollecton.find(query)
            const users = await cursor.toArray()
            res.send(users);

        });

        app.get('/users/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const userer = await userCollecton.findOne(query);
            res.send(userer);
        });


        app.post('/users', async (req, res) => {
            const user = req.body;
            console.log(user);
            const result = await userCollecton.insertOne(user);
            res.send(result);
        });
        app.delete('/users/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) }
            const result = await userCollecton.deleteOne(query);
            console.log(result);
            res.send(result);
        })

    }
    finally {

    }
}
run().catch(err => console.error(err));
app.listen(port, (req, res) => {
    console.log(`Running With the portal ${port}`);
})