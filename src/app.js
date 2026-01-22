import express from 'express';

const app = express();

app.get('/', (req, res) => {
    res.send('Everything is fine Here..');
})


export default app;