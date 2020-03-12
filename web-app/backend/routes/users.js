var express = require('express');
var router = express.Router();

// MongoDB
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const url =
  'mongodb+srv://root:root@cluster0-8kwlj.mongodb.net/test?retryWrites=true&w=majority';

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('Test User API calls!');
});

router.get('/ssar', function(req, res, next) {
  MongoClient.connect(url, { useUnifiedTopology: true, useNewUrlParser: true })
    .then((client, err) => {
      assert.equal(null, err);
      console.log('Connected successfully to server');
      const db = client.db('ssar');
      const collection = db.collection('sensors');
      collection.find({}).toArray(function(err, docs) {
        assert.equal(err, null);
        // console.log('Found the following records', docs);
        // callback(docs);
        client.close();
        res.json({ docs });
      });

      // const admin = db.admin();
      // admin.listDatabases(function(err, result) {
      //   console.log(result.databases);
      //   client.close();
      // });
      // console.log(admin);
      // client.close();
    })
    .catch(error => {
      console.log('error: ', error);
    });

  // res.send('Test SSAR!');
});

module.exports = router;
