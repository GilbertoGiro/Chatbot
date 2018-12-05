const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

// Express config
const app = express();
const routes = require('./routes');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api', routes);
app.get('/', (_, res) => res.send('API is working'));

const port = process.env.PORT || 3000;
const connection = app.listen(port, () => {
  const address = connection.address();
  console.log(JSON.stringify(address, null, 2));
  console.log(`Application connected on port - ${port}`);
});
