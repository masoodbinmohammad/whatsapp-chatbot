const express = require('express');
const bodyParser = require('body-parser');
const classifier = require('./trained-model/classifier')
const accountSid = process.env.accountSid;
const authToken = process.env.authToken;
const MessagingResponse = require('twilio').twiml.MessagingResponse;

const app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.post('/replySMS', (req, res) => {
    const twiml = new MessagingResponse();
    console.log(req.body)
    const message = req.body.Body.toUpperCase();
    const label = classifier.classify(message);

    if(label === 'greet'){
        twiml.message('Hello, Welcome to my to the channel. How may i help you');
    }
    else if (label === 'enquiry'){
        twiml.message('Hey, Yes it is available. Cost Rs 550');
    }
    else if (label === 'order'){
        twiml.message('Thank you for ordering. We will let you know once it is done.');
    }
    else {
        twiml.message('Sorry i could not understand what you are saying. Would you please elobarate a bit?');
    }
    res.writeHead(200, {'Content-Type': 'text/xml'});
    res.end(twiml.toString());
  });

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});