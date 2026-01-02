const http = require('http');
const { MongoClient } = require('mongodb');

const MONGO_URI = "<your_mongodb_connection_string>";

const mongoConnect = async (callback) => {
    let client;
    try {
        client = await MongoClient.connect(MONGO_URI);
        console.log("Connected to MongoDB successfully");

        const db = client.db('sample_mflix');

        // List all collections in the sample_mflix database and print their names
        const collections = await db.listCollections().toArray();
        console.log("Collections in sample_mflix:", collections.map(coll => coll.name));

        await callback(db);
    } catch (err) {
        console.error('Error while connecting to MongoDB:', err);
    } finally {
        if (client) {
            await client.close();
        }
    }
};

const app = http.createServer((req, res) => {
    if (req.url !== '/') {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Page Not Found!');
        return;
    }

    console.log('Request URL:', req.url);

    mongoConnect(async (db) => {
        try {
            const usersCollection = db.collection('users');

            // Example operation: Fetch all users
            const users = await usersCollection.find().toArray();
            // console.log('Users:', users);

            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(users));
        } catch (error) {
            console.error('Error during database operation:', error);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Internal Server Error' }));
        }
    });
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
}).on('error', (err) => {
    console.error('Error starting server:', err);
});