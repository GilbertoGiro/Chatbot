const express = require('express');
const bodyParser = require('body-parser');
const Watson = require('watson-developer-cloud');

const Assistant = new Watson.AssistantV1({
  username: 'apiKey',
  password: 'dSEb-T1JbX3oZyQpnYj3EoTHVDxyrnF0UbS8ft2inJC2',
  version: '2018-09-19',
});

const sendWatsonMessage = (text, { workspace_id, context }) => {
  return new Promise((resolve, reject) => {
    Assistant.message({
      workspace_id,
      input: { text },
      context,
    }, (err, response) => {
      if (err) {
        reject(err);
      } else {
        resolve(response);
      }
    });
  });
};

// Express config
const app = express();
const router = express.Router();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Express routes
router.post('/message', (req, res) => {
  const workspace_id = 'd30188f7-382d-49ec-be76-8a9a4a4df047';
  const { body } = req;

  sendWatsonMessage(body.message, { workspace_id, context: {} })
    .then((response) => {
      const { text } = response.output;
      res.send({ text: text[0] });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send('Internal Server Error!');
    });
});

app.use('/api', router);
app.get('/', (_, res) => res.send('API is working'));

const port = process.env.PORT || 3000;
const connection = app.listen(port, () => {
  const address = connection.address();
  console.log(JSON.stringify(address, null, 2));
  console.log(`Application connected on port - ${port}`);
});
