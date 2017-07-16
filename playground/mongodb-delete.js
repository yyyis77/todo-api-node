//const MongoClient = require('mongodb').MongoClient;
const { MongoClient, ObjectID } = require('mongodb');


var url = 'mongodb://localhost:27017/TodoApp';
MongoClient.connect(url, (err, db) => {
    if(err){
        return console.log('Unable to connect to MongoDB server.')
    }

    console.log('Connect to MongoDB server.');
    
    // 1.deleteMany
    // db.collection('Todos').deleteMany({text: 'Eat lunch'}).then((res) => {
    //     console.log(res);
    // });

    // 2.deleteOne
    // db.collection('Todos').deleteOne({text: 'Eat lunch'}).then((res) => {
    //     console.log(res);
    // });

    //3.findOneAndDelete
    // db.collection('Todos').findOneAndDelete({completed: false}).then((res) => {
    //     console.log(res);
    // })


    // db.collection('Users').deleteMany({name:'yyy', location: 'Nanjing'}).then((res) => {
    //     console.log(res);
    // });

    var id = new ObjectID('596ad26e00720771f58cb3e6');
    db.collection('Users').deleteOne({_id: id}).then((res) => {
        console.log(res);
    });

    db.close();
});