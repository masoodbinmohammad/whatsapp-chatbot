const express = require('express');
const bodyParser = require('body-parser');
const natural = require('natural');
const accountSid = process.env.accountSid;
const authToken = process.env.authToken;
const MessagingResponse = require('twilio').twiml.MessagingResponse;

const app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', function (req, res) {
  res.send('Hello World!');
});

natural.BayesClassifier.load('./trained-model/classifier.json', null, function(err, classifier) {
  if(err){
    console.log(err.message)
  }
  console.log(classifier.classify('i want to order'));
  console.log(classifier.classify('how much is the price'));
  console.log(classifier.classify('Hi bro'));
});

app.post('/replySMS', (req, res) => {
    const greetAray =['HELLO','HI'];
    const enquiry = ['RATE','AVAILABLE'];
    const order = ['ORDER','DONE'];
    const twiml = new MessagingResponse();
    console.log(req.body)
    const message = req.body.Body.toUpperCase();
    if(greetAray.includes(message)){
        twiml.message('Hello, Welcome to my to the channel. How may i help you');
    }
    else if (enquiry.includes(message)){
        twiml.message('Hey, Yes it is available. Cost Rs 550');
    }
    else if (order.includes(message)){
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