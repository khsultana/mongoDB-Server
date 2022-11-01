const express = require('express')
const app = express();
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors = require('cors');
const port = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());


app.get('/', (req, res) => {
    res.send('API Is Running');
})



// userid:dbUser1
//pass: ZMT5RDgQ6wqQ1WYW



const uri = "mongodb+srv://dbUser1:ZMT5RDgQ6wqQ1WYW@cluster0.r5kyl42.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {

    try {
        const userCollecton = client.db('MOngo').collection('users');
        app.post('/users', async (req, res) => {
            const user = req.body;
            console.log(user)
            const result = await userCollecton.insertOne(user);
            res.send(result)
        })

    }
    finally {

    }
}
run().catch(err => console.error(err))

app.listen(port, (req, res) => {
    console.log(`Running With the portal ${port}`);
})