const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// var id = '5970c4c0c2b6b74106edc0cb';
var userID = '596c326ee93356951c93f435'
// if(! ObjectID.isValid(id)){
//     console.log('ID not valid');
// }

// // return an array; when not found -> return an empty array
// Todo.find({
//     _id: id
// }).then((todos) => {
//     console.log('Todos: ', todos);
// });

// // return an obj; when not found -> return null
// Todo.findOne({
//     _id: id
// }).then((todo) => {
//     console.log('Todo: ', todo)
// });

// // the same as findOne
// Todo.findById(id).then((todo) => {
//     if(!todo){
//         return console.log('id not found');
//     }
//     console.log('Todo by serch id: ', todo)
// }).catch((err) => console.log(err));

User.findById(userID).then((user) => {
    if(!user){
        return console.log('User not found');
    }
    console.log('User serched by id: ', JSON.stringify(user,undefined,2));
}).catch((err) => console.log(err));