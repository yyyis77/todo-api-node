var express = require('express');
var bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');
var {ObjectID} = require('mongodb');

var app = express();

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
    //console.log(req.body);
    var todo = new Todo({
        text: req.body.text
    });

    todo.save().then((doc) => {
        res.send(doc);
    },(err) => {
        res.status(400).send(err);
    });
});

app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
        res.send({todos});
    },(err) => {
        res.status(400).send(err);
    })
});

app.get('/todos/:id', (req, res) => {
    var id = req.params.id;

    if(!ObjectID.isValid(id)){
        return res.status(404).send();
    }

    Todo.findById(id).then((todo) => {
        if(!todo){
            return res.status(404).send();
        }
        res.send({todo});

    }).catch((err) => {
        res.statud(400).send();
    })
});

app.listen(3000, () => {
    console.log('Started on port 3000');
})

module.exports = {app};

// var newTodo = new Todo({
//     text: 'Cook dinner'
// });

// var newTodo = new Todo({
//     text: 'Do exercise',
//     completed: false,
//     completedAt: 77
// })

// newTodo.save().then((doc) => {
//     console.log('Saved todo: ', doc);
// }, (err) => {
//     console.log('Unable to save todo',err);
// });


// var newUser = new User({
//     email: "yyy@qq.com"
// })

// newUser.save().then((doc) => {
//     console.log('Saved user: ', doc);
// }, (err) => {
//     console.log('Unable to save user', err);
// })