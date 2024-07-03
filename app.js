import express from 'express';
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send('index page');
});

app.listen(port, () => {
    console.log(`App is running on server ${port}`);
});
