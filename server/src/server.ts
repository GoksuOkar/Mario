const express = require('express');
const morgan = require('morgan');
const cors = require('cors');


const app = express();

app.use(cors());
app.use(morgan('dev'));

const port = 3001;

app.get('/', (req, res) => {res.send('works?')});

app.set('port',port);
app.listen(port, () => console.log(`listening on port ${port}`));