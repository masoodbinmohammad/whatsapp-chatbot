const natural = require('natural');
const classifier = new natural.BayesClassifier();


classifier.save('./trained-model/classifier.json', function (err, classifier) {
    classifier.addDocument('Hello Hi', 'greet');
    classifier.addDocument('What is the price', 'enquiry');
    classifier.addDocument('how much', 'enquiry');
    classifier.addDocument('Order', 'order');
    classifier.addDocument('Could you please order', 'order');
    classifier.addDocument('Order karo', 'order');
    classifier.addDocument('payment is done', 'order');
    classifier.train();
});

classifier.events.on('trainedWithDocument', function (obj) {
    console.log(obj);
});

natural.BayesClassifier.load('./trained-model/classifier.json', null, function (err, lOadedclassifier) {
    if (err) {
        console.log('Some non-sense issue');
    }
    console.log(lOadedclassifier.classify('i want to order'));
    console.log(lOadedclassifier.classify('how much is the price'));
    console.log(lOadedclassifier.classify('Hi bro'));
});
classifier.addDocument('Done', 'order');
