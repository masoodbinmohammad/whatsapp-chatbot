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
    classifier.addDocument('Done', 'order');
    classifier.train();
});

classifier.events.on('trainedWithDocument', function (obj) {
    console.log(obj);
    /* {
    *   total: 23 // There are 23 total documents being trained against
    *   index: 12 // The index/number of the document that's just been trained against
    *   doc: {...} // The document that has just been indexed
    *  }
    */
 });

 natural.BayesClassifier.load('./trained-model/classifier.json', null, function(err, classifier) {
    if(err){
      console.log(err.message)
    }
    console.log(classifier.classify('i want to order'));
    console.log(classifier.classify('how much is the price'));
    console.log(classifier.classify('Hi bro'));
  });
