const AWSLambdaRouter = require('aws-lambda-router-wn');
const axios = require('axios');
const app = new AWSLambdaRouter();

app.post('/', async (request, response) => {
  let resBody;
  const reqBody = request.body;
  if (reqBody.language.toString() == 'fr') {
    const res = await axios.get('https://fathomless-island-76403.herokuapp.com/api');
    resBody = res.data;
  } else if (reqBody.language.toString() == 'pt') {
    const res = await axios.get('https://fathomless-island-76402.herokuapp.com/api');
    resBody = res.data;
  } else if (typeof reqBody.language == 'undefined' || reqBody.language == '') {
    resBody = "Empty language";
  }

  if (typeof resBody == 'undefined' || resBody == '') {
    resBody = "Empty response";
  }

  response(null, resBody);
}, {
  bodyType: 'application/json'
});

exports.handler = (event, context, callback) => {
  app.serve(event, callback);
};