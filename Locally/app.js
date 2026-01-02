const http = require('http');
const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost:27017';  // Connection URL
const dbName = 'firstDb';  // Database Name

async function connectToMongo() {
    const client = new MongoClient(url);
    
    try {
        await client.connect();  // Connect to MongoDB
        console.log('Connected to MongoDB');
        
        const db = client.db(dbName);
        const collection = db.collection('students');

        //fetch all documents in collection 'students'
        const documents = await collection.find({}).toArray();
        console.log("Database Query Result:", documents);
    } catch (err) {
        console.error('Error in MongoDB Connection', err);
    } finally {
        await client.close(); 
    }
}

connectToMongo();

const app = http.createServer((req, res) => {
    console.log("Hello!!");
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Hello World!');
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});