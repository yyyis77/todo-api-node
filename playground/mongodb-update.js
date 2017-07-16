//const MongoClient = require('mongodb').MongoClient;
const { MongoClient, ObjectID } = require('mongodb');

var url = 'mongodb://localhost:27017/TodoApp';
MongoClient.connect(url, (err, db) => {
    if(err){
        return console.log('Unable to connect to MongoDB server.')
    }

    console.log('Connect to MongoDB server.');
    
    // db.collection('Todos').findOneAndUpdate({
    //     _id: new ObjectID('59691c80cdee030ede945423')
    // },{
    //     $set: {
    //         completed: true
    //     }
    // },{
    //     returnOriginal: false
    // }).then((res) => {
    //     console.log(res);
    // });

    db.collection('Users').findOneAndUpdate({
        _id: new ObjectID('596ad71800720771f58cb4b2')
    },{
        $inc: {
            age: 1
        }
    },{
        returnOriginal: false
    }).then((res) => {
        console.log(res);
    })

    db.close();
});