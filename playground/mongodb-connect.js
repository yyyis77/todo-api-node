//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

var obj = new ObjectID();
console.log(obj);

var url = 'mongodb://localhost:27017/TodoApp';
MongoClient.connect(url, (err, db) => {
    if(err){
        return console.log('Unable to connect to MongoDB server.')
    }

    console.log('Connect to MongoDB server.');
    // db.collection('Todos').insertOne({
    //     text: 'Something to do',
    //     complete: 'false'
    // },(err, res) => {
    //     if(err){
    //         return console.log('Unable to insert todo', err);
    //     }
    //     console.log(JSON.stringify(res.ops, undefined, 2));
    // });

    // db.collection('Users').insertOne({
    //     name: 'yyy',
    //     age: 23,
    //     location: 'Nanjing'
    // }, (err, res) => {
    //     if(err){
    //         return console.log('Unable to insert user', err);
    //     }
    //     console.log(res.ops[0]._id.getTimestamp());
    // });
    db.close();
});