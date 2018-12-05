const express = require('express');
const Watson = require('watson-developer-cloud');
const configDatabase = require('../db');
const Context = require('../models/context');

const router = express.Router();

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

// Initialize database
configDatabase()
  .then(() => {
    // Express routes
    router.post('/message', (req, res) => {
      const workspace_id = 'd30188f7-382d-49ec-be76-8a9a4a4df047';
      const { body } = req;

      Context.find()
        .then((contexts) => {
          const olderContext = contexts[0];
          sendWatsonMessage(body.message, { workspace_id, context: olderContext ? olderContext.context : {} })
            .then((response) => {
              console.log(response.context);
              // Save new context
              const context = new Context({ context: response.context });
              context.save();

              const { text: messages } = response.output;
              res.send({ messages });
            })
            .catch((err) => {
              console.log(err);
              res.status(500).send('Internal Server Error!');
            });
        })
        .catch(console.log);
    });
  })
  .catch(console.error);

module.exports = router;
