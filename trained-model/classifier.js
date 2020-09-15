const natural = require('natural');
const classifier = new natural.BayesClassifier();

classifier.addDocument('Hello Hi', 'greet');
classifier.addDocument('What is the price', 'enquiry');
classifier.addDocument('how much', 'enquiry');
classifier.addDocument('Order', 'order');
classifier.addDocument('Could you please order', 'order');
classifier.addDocument('Order karo', 'order');
classifier.addDocument('payment is done', 'order');
classifier.train();

module.exports = classifier;