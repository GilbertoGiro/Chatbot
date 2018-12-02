const Watson = require('watson-developer-cloud');

const Assistant = new Watson.AssistantV1({
    username: 'apiKey',
    password: 'dSEb-T1JbX3oZyQpnYj3EoTHVDxyrnF0UbS8ft2inJC2',
    version: '2018-09-19',
    // url: 'https://gateway.watsonplatform.net/assistant/api/v1/workspaces/d30188f7-382d-49ec-be76-8a9a4a4df047/message'
});

Assistant.message({
    workspace_id: 'd30188f7-382d-49ec-be76-8a9a4a4df047',
    input: { text: 'E ai meu?' },
    context: {
        name: 'Gilberto'
    }
}, function(err, response) {
    if (err) {
        console.error(err);
    } else {
        console.log(JSON.stringify(response.context, null, 2))
        // console.log(JSON.stringify(response, null, 2));
    }
});