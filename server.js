var express = require('express');
var app = express();
var port = 3000;

app.use(express.static('public'));
app.get('/', (req, res) => res.send('index.html'));


app.listen(port, () => console.log(`Listening on port ${port}!`));