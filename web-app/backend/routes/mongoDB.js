var express = require('express');
var router = express.Router();

// MongoDB
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const url = process.env.MONGODB_CLIENT_URL;

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('Test MongoDB API calls!');
});

router.get('/ip', (req, res, next) => {
  MongoClient.connect(url, { useUnifiedTopology: true, useNewUrlParser: true })
    .then((client, err) => {
      assert.equal(null, err);
      console.log('Connected successfully to server');
      const db = client.db('ssar');
      const collection = db.collection('ip');
      collection.find({}).toArray(function(err, docs) {
        assert.equal(err, null);
        console.log('Found the following records', docs);
        client.close();
        res.json({ docs });
      });
    })
    .catch(error => {
      console.log('error: ', error);
    });
});

router.post('/ip', (req, res, next) => {
  const { ip } = req.body;
  MongoClient.connect(url, { useUnifiedTopology: true, useNewUrlParser: true })
    .then((client, err) => {
      assert.equal(null, err);
      console.log('Connected successfully to server changing ip...');
      const db = client.db('ssar');
      const collection = db.collection('ip');
      collection.remove({});
      collection.insertOne({
        ip: ip,
      }).then(response=> {
        res.json({ response });
      });
    })
    .catch(error => {
      console.log('IP Update Error: ', error);
    });
});

router.get('/ssar', function(req, res, next) {
  MongoClient.connect(url, { useUnifiedTopology: true, useNewUrlParser: true })
    .then((client, err) => {
      assert.equal(null, err);
      console.log('Connected successfully to server');
      const db = client.db('ssar');
      const collection = db.collection('sensors');
      collection
        .find({ lon: { $ne: 'n/a', $exists: true } })
        .toArray(function(err, docs) {
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
