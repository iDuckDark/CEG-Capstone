const express = require('express');
const router = express.Router();

// MongoDB
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const url = process.env.MONGODB_CLIENT_URL;

router.get('/', function(_req, res, next) {
  res.send('Test MongoDB API calls!');
});

router.get('/ip', (_req, res, next) => {
  MongoClient.connect(url, { useUnifiedTopology: true, useNewUrlParser: true })
    .then((client, err) => {
      assert.equal(null, err);
      const db = client.db('ssar');
      const collection = db.collection('ip');
      collection.find({}).toArray(function(err, docs) {
        assert.equal(err, null);
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
      const db = client.db('ssar');
      const collection = db.collection('ip');
      collection.remove({});
      collection.insertOne({
        ip,
      }).then(response=> {
        res.json({ response });
      });
    })
    .catch(error => {
      console.log('IP Update Error: ', error);
    });
});

router.get('/ssar', function(_req, res, next) {
  MongoClient.connect(url, { useUnifiedTopology: true, useNewUrlParser: true })
    .then((client, err) => {
      assert.equal(null, err);
      const db = client.db('ssar');
      const collection = db.collection('sensors');
      collection
        .find({ lon: { $ne: 'n/a', $exists: true } })
        .toArray(function(err, docs) {
          assert.equal(err, null);
          client.close();
          res.json({ docs });
        });
    })
    .catch(error => {
      console.log('error: ', error);
    });
});

module.exports = router;
