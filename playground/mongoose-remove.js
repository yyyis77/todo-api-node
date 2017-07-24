const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// Todo.remove({}).then((res) => {
//     console.log(res);
// });

// Todo.findOneAndRemove({_id: '597602d9e3849f0039476ad9'}).then((res) => {
//     console.log(todo);
// });

Todo.findByIdAndRemove('597602d9e3849f0039476ad9').then((todo) => {
    console.log(todo);
})